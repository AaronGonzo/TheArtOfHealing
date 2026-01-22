# The Art of Healing Website

Website for The Art of Healing with Alison - https://www.healwithalison.com

## Project Structure

```
TheArtOfHealing/
├── functions/           # Cloudflare Pages Functions
│   └── contact-form.js  # Contact form email handler
├── healingy/            # Static website files
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── contact-us.html
│   └── ...
└── README.md
```

## Deployment

This site is deployed to Cloudflare Pages using the Wrangler CLI.

### Prerequisites

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

### Deploy

From the project root directory, run:

```bash
wrangler pages deploy healingy --project-name=healingly
```

This deploys:
- Static files from `healingy/` directory
- Cloudflare Functions from `functions/` directory

### Environment Variables

The following environment variables must be set in Cloudflare Pages dashboard:

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key for Resend email service |

To set environment variables:
1. Go to Cloudflare Dashboard → Pages → healingly
2. Settings → Environment variables
3. Add the variable for Production (and Preview if needed)

## Contact Form

The contact form uses a Cloudflare Pages Function (`/contact-form`) to send emails via the Resend API.

**Form fields:**
- `name` - Contact name
- `phone` - Phone number
- `service` - Selected service
- `message` - Message content

Emails are sent to: alison.creativepath@gmail.com
