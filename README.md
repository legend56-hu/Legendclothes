# LEGEND — Clothing Brand Website

A modern, responsive website for the **LEGEND** clothing brand featuring a product catalog with prices, MOQ (Minimum Order Quantity), and an order request form that sends **email notifications** to the brand owner when customers submit their choices.

## Features

- **Product Catalog** — 8 products across 4 categories (T-shirts, Hoodies, Pants, Dresses)
- **Price & MOQ Display** — Each product shows its unit price and minimum order quantity
- **Category Filtering** — Filter products by category with one click
- **Order Selection** — Customers select products and adjust quantities
- **MOQ Validation** — Quantities below the minimum are flagged before submission
- **Email Notifications** — Order details are emailed to `legend_0703@qq.com` via EmailJS
- **Responsive Design** — Works on desktop, tablet, and mobile devices

---

## Quick Start

### 1. Open the Website

Simply open `index.html` in any web browser:

```
Double-click index.html
```

Or run a local server:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve
```

Then visit `http://localhost:8000`.

> **Note:** The website works immediately in "Demo Mode" — form submissions are logged to the browser console instead of sending real emails. Follow the EmailJS setup below to enable real email notifications.

---

## EmailJS Setup (Email Notifications)

To receive real email notifications when customers submit orders, configure EmailJS:

### Step 1: Create an EmailJS Account

1. Go to [emailjs.com](https://www.emailjs.com/) and sign up (free tier: 200 emails/month)
2. Verify your email address

### Step 2: Add an Email Service

1. Go to **Email Services** → **Add New Service**
2. Choose your email provider (Gmail, QQ Mail, Outlook, etc.)
3. Connect your email account (`legend_0703@qq.com`)
4. Copy the **Service ID** (e.g., `service_xxxxx`)

### Step 3: Create an Email Template

1. Go to **Email Templates** → **Create New Template**
2. Use this template structure:

   **Subject:**
   ```
   New Order Request from {{customer_name}}
   ```

   **Content:**
   ```
   You have received a new order request!

   --- Customer Info ---
   Name: {{customer_name}}
   Email: {{customer_email}}
   Phone: {{customer_phone}}
   Country: {{customer_country}}

   --- Order Details ---
   Preferred Size: {{preferred_size}}

   {{order_details}}

   Total: {{total_cost}}

   --- Notes ---
   {{notes}}

   Reply to: {{reply_to}}
   ```

3. Save the template and copy the **Template ID** (e.g., `template_xxxxx`)

### Step 4: Get Your Public Key

1. Go to **Account** → **API Keys**
2. Copy your **Public Key**

### Step 5: Configure the Website

Open `js/main.js` and update the `EMAILJS_CONFIG` object at the top:

```javascript
const EMAILJS_CONFIG = {
  publicKey: "YOUR_PUBLIC_KEY",      // ← Replace with your Public Key
  serviceId: "YOUR_SERVICE_ID",      // ← Replace with your Service ID
  templateId: "YOUR_TEMPLATE_ID",    // ← Replace with your Template ID
  toEmail: "legend_0703@qq.com"      // Your notification email
};
```

Save the file and refresh the website. Form submissions will now send real emails!

---

## Customization Guide

### Changing Product Information

Open `js/products.js` and edit the `PRODUCTS` array:

```javascript
{
  id: 1,                          // Unique ID (must be unique)
  name: "Classic Essential Tee",  // Product name
  category: "T-shirts & Tops",    // Category (must match a CATEGORIES entry)
  price: 18.00,                   // Unit price in USD
  moq: 50,                        // Minimum Order Quantity
  image: "images/product-1-tee.jpg",  // Local image path (or URL)
  description: "..."              // Short description
}
```

To add a new product, copy an existing product object and change the values. Make sure the `id` is unique.

### Replacing Placeholder Images

The project includes placeholder images in the `images/` folder:

| File | Product |
|------|---------|
| `hero-bg.jpg` | Hero section background |
| `product-1-tee.jpg` | Classic Essential Tee |
| `product-2-polo.jpg` | Urban Graphic Polo |
| `product-3-hoodie.jpg` | Premium Fleece Hoodie |
| `product-4-sweatshirt.jpg` | Oversized Crew Sweatshirt |
| `product-5-jeans.jpg` | Slim Fit Denim Jeans |
| `product-6-cargo.jpg` | Casual Cargo Pants |
| `product-7-dress.jpg` | Elegant Summer Dress |
| `product-8-suit.jpg` | Tailored Business Suit |
| `placeholder.svg` | Fallback image if a product photo fails to load |

**To use your own photos:**

1. Replace the files in `images/` with your own photos (keep the same filenames, or update the paths in `js/products.js`)
2. Recommended image size: **600×400px** for products, **1600×900px** for hero background
3. Supported formats: `.jpg`, `.png`, `.webp`

Or use an online image URL instead:
```javascript
image: "https://your-cdn.com/my-tshirt.jpg",

### Changing the Notification Email

Open `js/main.js` and update:

```javascript
toEmail: "your-new-email@example.com"
```

Also update the contact email in `index.html` (footer section):

```html
<a href="mailto:your-new-email@example.com">your-new-email@example.com</a>
```

### Changing Brand Colors

Open `css/style.css` and modify the CSS variables at the top:

```css
:root {
  --gold: #d4af37;        /* Accent color */
  --black: #0a0a0a;       /* Primary dark */
  --white: #ffffff;       /* Primary light */
  /* ... */
}
```

### Changing the Hero Background Image

Open `css/style.css`, find the `.hero` class, and replace the background URL:

```css
.hero {
  background: linear-gradient(...),
    url('your-image-url') center/cover no-repeat;
}
```

---

## File Structure

```
legend-website/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # All styles
├── js/
│   ├── products.js         # Product data (edit this to change products)
│   └── main.js             # App logic + EmailJS config
├── images/                 # All product & background images
│   ├── hero-bg.jpg         # Hero section background
│   ├── product-1-tee.jpg   # Product photos...
│   ├── product-2-polo.jpg
│   ├── product-3-hoodie.jpg
│   ├── product-4-sweatshirt.jpg
│   ├── product-5-jeans.jpg
│   ├── product-6-cargo.jpg
│   ├── product-7-dress.jpg
│   ├── product-8-suit.jpg
│   └── placeholder.svg     # Fallback image
└── README.md               # This file
```

---

## Deployment

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all files
3. Go to **Settings** → **Pages** → **Source: main branch**
4. Your site will be live at `https://yourusername.github.io/legend-website/`

### Option 2: Netlify (Free, Easiest)

1. Go to [netlify.com](https://www.netlify.com/)
2. Drag and drop the `legend-website` folder onto the Netlify dashboard
3. Your site is instantly live with a URL like `https://legend-website.netlify.app`

### Option 3: Vercel (Free)

1. Go to [vercel.com](https://vercel.com/)
2. Import your GitHub repository
3. Deploy — done!

---

## Troubleshooting

**Q: Form submits but no email arrives**
- Verify your EmailJS credentials are correct in `js/main.js`
- Check your EmailJS dashboard for send logs
- Make sure the Email Service is connected and active
- Check your spam/junk folder

**Q: Images not loading**
- All images are stored locally in the `images/` folder — make sure it's uploaded with the project
- If using your own images, verify the filenames match what's in `js/products.js`
- A fallback `placeholder.svg` displays automatically if an image is missing

**Q: Website shows "Demo Mode" message**
- This means EmailJS keys haven't been configured yet. Follow the EmailJS Setup section above.

---

## Support

For questions about this website, contact: **legend_0703@qq.com**

---

&copy; 2026 LEGEND. All rights reserved.
