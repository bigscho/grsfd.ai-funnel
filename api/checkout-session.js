// POST /api/checkout-session
//
// Creates a Stripe Checkout Session for the Grassfed Just Listed / Just Sold
// 4-campaign bundle ($825 = 3 paid + 1 free) and saves the payment method
// for future off-session charges (MLS-event-triggered).
//
// Env vars required:
//   STRIPE_SECRET_KEY    Stripe test or live secret key
//
// Returns: { url, id }

const STRIPE_API = 'https://api.stripe.com/v1/checkout/sessions';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    // No key configured — fall back to the local mock checkout screen.
    return res.status(200).json({ mock: true });
  }

  const { primaryAddress = '', optionalListings = [] } =
    (req.body && typeof req.body === 'object' ? req.body : {}) || {};

  const proto = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host || 'localhost:4321';
  const baseUrl = `${proto}://${host}`;

  const body = new URLSearchParams();
  body.set('mode', 'payment');
  body.set('customer_creation', 'always');
  body.set('payment_intent_data[setup_future_usage]', 'off_session');
  body.set('payment_intent_data[description]', 'Grassfed Just Listed/Just Sold — 4-campaign bundle');
  body.set('consent_collection[payment_method_reuse_agreement][position]', 'auto');
  body.set('billing_address_collection', 'auto');
  body.set('allow_promotion_codes', 'false');

  body.set('line_items[0][price_data][currency]', 'usd');
  body.set(
    'line_items[0][price_data][product_data][name]',
    'Grassfed Just Listed/Just Sold — 4-Campaign Bundle'
  );
  body.set(
    'line_items[0][price_data][product_data][description]',
    `1 free + 3 prepaid campaigns. First campaign: ${primaryAddress || 'your listing/sale address'}.`
  );
  body.set('line_items[0][price_data][unit_amount]', '82500');
  body.set('line_items[0][quantity]', '1');

  body.set('success_url', `${baseUrl}/signup/?status=success&session_id={CHECKOUT_SESSION_ID}`);
  body.set('cancel_url', `${baseUrl}/signup/?status=canceled`);

  body.set(
    'custom_text[submit][message]',
    "By placing this order you authorize Grassfed to charge $275 each time a new listing or sale on your MLS triggers a campaign — after your 3 prepaid campaigns are used. We'll email you 24 hours before every charge. Cancel anytime in your portal."
  );

  body.set('metadata[primary_address]', primaryAddress || '');
  if (Array.isArray(optionalListings) && optionalListings.length) {
    body.set('metadata[optional_listings]', optionalListings.join(' | '));
  }
  body.set('metadata[funnel]', 'just-listed-just-sold');

  try {
    const r = await fetch(STRIPE_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });
    const data = await r.json();
    if (!r.ok) {
      console.error('Stripe error:', data);
      return res.status(r.status).json({
        error: (data && data.error && data.error.message) || 'Stripe API error',
        raw: data,
      });
    }
    return res.status(200).json({ url: data.url, id: data.id });
  } catch (err) {
    console.error('Checkout session creation failed:', err);
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
