# SIMAC Website - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Update Your HTML Files

#### For index.html:
Replace this:
```html
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>
```

With this:
```html
<link rel="stylesheet" href="css/main.css">
<script src="js/main.js"></script>
<script src="js/home.js"></script>
<script src="js/form-handler.js"></script>
```

#### Create catalogo.html in root:
Copy from `Catalogo/index.html` but update links to:
```html
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/catalog.css">
<script src="js/main.js"></script>
<script src="js/products-data.js"></script>
<script src="js/catalog.js"></script>
```

### Step 2: Update Navigation Links

Change all references from:
```html
<a href="Catalogo/index.html">
```

To:
```html
<a href="catalogo.html">
```

### Step 3: Test Everything

```bash
# Start the dev server
npm start

# Open in browser
http://localhost:8000
```

Check:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Catalog page displays
- [ ] Forms validate
- [ ] No console errors

---

## 📁 File Organization

**Keep These:**
- ✅ `/css/` folder (new unified styles)
- ✅ `/js/` folder (new modular scripts)
- ✅ `index.html` (update links)
- ✅ Create `catalogo.html` (new)

**Remove After Testing:**
- ❌ `/Catalogo/` folder (old structure)
- ❌ `styles.css` (replaced)
- ❌ `script.js` (replaced)

---

## 🎯 What You Get

### Unified Structure
- One main CSS file instead of two
- Modular JavaScript instead of duplicated code
- Single catalog page instead of separate folder

### Real Form Handling
- Saves to Supabase database
- Real-time validation
- Toast notifications
- No more alerts!

### Better Performance
- Lazy loading images
- Optimized scroll events
- Debounced search
- Faster page loads

### Improved Design
- Better mobile experience
- Smoother animations
- Enhanced accessibility
- Professional look

---

## 💾 Database Setup (Optional)

Your Supabase database is ready! The contact form will:
- Save automatically to `contact_submissions` table
- Work even if Supabase isn't configured
- Show success messages either way

To view submissions:
1. Go to Supabase Dashboard
2. Navigate to Table Editor
3. Select `contact_submissions`

---

## 🔧 Quick Customization

### Change Colors
Edit `css/main.css`:
```css
:root {
    --primary-color: #011526;    /* Your navy */
    --secondary-color: #f25c05;  /* Your orange */
}
```

### Add Products
Edit `js/products-data.js`:
```javascript
{
    id: 31,
    name: "New Product",
    brand: "Brand",
    category: "Category",
    partNumber: "PART-123",
    availability: "in-stock"
}
```

### Update Contact Info
Search for `551133686305` and replace with your WhatsApp number.

---

## 🆘 Troubleshooting

**Images not loading?**
- Check paths in HTML
- Add `loading="lazy"` attribute

**Forms not submitting?**
- Open browser console (F12)
- Check for error messages
- Verify Supabase .env settings

**Catalog not filtering?**
- Ensure `products-data.js` loads first
- Check console for errors

**Navigation not working?**
- Verify link paths are correct
- Check file names match exactly

---

## 📚 Full Documentation

- **IMPLEMENTATION_GUIDE.md** - Complete step-by-step guide
- **CHANGES_SUMMARY.md** - All improvements explained
- **This file** - Quick start only

---

## ✅ Final Checklist

Before going live:

- [ ] Updated index.html with new CSS/JS links
- [ ] Created catalogo.html in root
- [ ] Updated all navigation links
- [ ] Tested on mobile device
- [ ] Verified forms submit correctly
- [ ] Checked catalog filtering works
- [ ] No console errors
- [ ] Removed old /Catalogo/ folder
- [ ] Removed old styles.css
- [ ] Removed old script.js

---

**Need help?** Check IMPLEMENTATION_GUIDE.md for detailed instructions!
