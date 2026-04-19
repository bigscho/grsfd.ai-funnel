# grsfd.ai-funnel

The website and funnel pages for Grassfed (`grsfd.ai`).

## Structure

```
public/              Static site (served at the root domain)
  index.html         Home
  farm/index.html    /farm
  pricing/index.html /pricing
  unlock/            /unlock — grsfd opt-in flow
    index.html       opt-in form
    results/         post-submit teaser page
  farm/unlock/       /farm/unlock — grsfd-farm opt-in flow
  assets/            Logos
  *.jsx              React components (Babel-compiled in-browser)
  colors_and_type.css
  icons.js

api/
  optin.js           POST /api/optin — writes leads to Airtable

design-system/       Claude Design handoff bundle (reference only, not served)
vercel.json          Clean URLs, no trailing slash
.env.example         Env var template
```

## Deployment (Vercel)

1. Import the repo in Vercel → zero-config static + serverless functions.
2. Set these env vars in **Project → Settings → Environment Variables**:
   - `AIRTABLE_PAT`
   - `AIRTABLE_BASE_ID` = `appy3uDvQHssS7Cgi`
   - `AIRTABLE_TABLE_ID` = `tblfz6LtEDn5di2sG`
3. Add domain `grsfd.ai` in **Project → Settings → Domains**, follow the two DNS records Vercel shows, and add them at GoDaddy.

## Opt-in → Airtable mapping

Form submissions from `/unlock` and `/farm/unlock` POST to `/api/optin`, which writes a record to the Pipeline (All) table:

| Form field | Airtable field |
|---|---|
| First name | First Name |
| Last name | Last Name |
| (computed) | Agent Name (`First Last`) |
| Email | Email |
| Phone | Mobile Phone |
| MLS ID or Zip | Initial Response Text (`MLS ID: AR12345` or `Zip: 85251`) |
| — | Current Prospecting Stage = `NEW (<24hr)` |

## Local dev

Install the Vercel CLI and run `vercel dev` from the repo root. Copy `.env.example` to `.env.local` and fill in the real PAT.
