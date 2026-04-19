// POST /api/optin
// Creates a new lead in the Airtable Pipeline (All) table.
//
// Request body (JSON):
//   firstName, lastName, email, phone  (required)
//   mlsId        (grsfd flow)          (optional)
//   zip          (grsfd-farm flow)     (optional)
//   source       'grsfd' | 'grsfd-farm'
//
// Env vars required on Vercel:
//   AIRTABLE_PAT       Personal access token (data.records:write scope)
//   AIRTABLE_BASE_ID   Base ID (e.g. appy3uDvQHssS7Cgi)
//   AIRTABLE_TABLE_ID  Table ID (e.g. tblfz6LtEDn5di2sG)

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_ID = process.env.AIRTABLE_TABLE_ID;
const PAT = process.env.AIRTABLE_PAT;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!BASE_ID || !TABLE_ID || !PAT) {
    console.error('Missing Airtable env vars');
    return res.status(500).json({ error: 'Server not configured' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const { firstName, lastName, email, phone, mlsId, zip, source } = body;

  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const trimmedFirst = String(firstName).trim();
  const trimmedLast = String(lastName).trim();
  const agentName = `${trimmedFirst} ${trimmedLast}`.trim();

  const criteria = mlsId
    ? `MLS ID: ${String(mlsId).trim()}`
    : zip
    ? `Zip: ${String(zip).trim()}`
    : '';

  const fields = {
    'First Name': trimmedFirst,
    'Last Name': trimmedLast,
    'Agent Name': agentName,
    'Email': String(email).trim(),
    'Mobile Phone': String(phone).trim(),
    'Initial Response Text': criteria,
    'Current Prospecting Stage': 'NEW (<24hr)',
  };

  try {
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [{ fields }],
          typecast: true,
        }),
      }
    );

    if (!airtableRes.ok) {
      const text = await airtableRes.text();
      console.error('Airtable error', airtableRes.status, text);
      return res.status(502).json({ error: 'Upstream error' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Airtable request failed', err);
    return res.status(500).json({ error: 'Request failed' });
  }
}
