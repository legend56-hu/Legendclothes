// ============================================================
// LEGEND — Main JavaScript
// Handles: product rendering, filtering, selection, form, EmailJS
// ============================================================

// ----- EmailJS Configuration -----
// Replace these 3 values with your own EmailJS credentials.
// See README.md for step-by-step setup instructions.
const EMAILJS_CONFIG = {
  publicKey: "YOUR_PUBLIC_KEY",        // From EmailJS → Account → API Keys
  serviceId: "YOUR_SERVICE_ID",        // From EmailJS → Email Services
  templateId: "YOUR_TEMPLATE_ID",      // From EmailJS → Email Templates
  toEmail: "legend_0703@qq.com"        // Where notifications are sent
};

// Initialize EmailJS
if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY") {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

// ----- State -----
let selectedProducts = {}; // { productId: { ...product, quantity } }
let currentFilter = "All";

// ============================================================
// DOM Ready
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderFilterTabs();
  renderProducts();
  updateOrderSummary();
  initHamburger();
  initForm();
});

// ============================================================
// Hamburger Menu
// ============================================================
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ============================================================
// Filter Tabs
// ============================================================
function renderFilterTabs() {
  const container = document.getElementById('filterTabs');
  container.innerHTML = CATEGORIES.map(cat =>
    `<button class="filter-tab ${cat === currentFilter ? 'active' : ''}" onclick="filterProducts('${cat}')">${cat}</button>`
  ).join('');
}

function filterProducts(category) {
  currentFilter = category;
  renderFilterTabs();
  renderProducts();
}

// ============================================================
// Product Grid
// ============================================================
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const filtered = currentFilter === "All"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === currentFilter);

  grid.innerHTML = filtered.map(product => {
    const isSelected = selectedProducts[product.id];
    return `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy"
               onerror="this.onerror=null;this.src='images/placeholder.svg'">
          <span class="product-category">${product.category}</span>
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <div class="product-meta">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <span class="product-moq">MOQ: <strong>${product.moq}</strong> pcs</span>
          </div>
          <button class="btn-select ${isSelected ? 'selected' : ''}" onclick="toggleProduct(${product.id})">
            ${isSelected ? '✓ Selected' : 'Select'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================
// Toggle Product Selection
// ============================================================
function toggleProduct(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  if (selectedProducts[id]) {
    delete selectedProducts[id];
  } else {
    selectedProducts[id] = { ...product, quantity: product.moq };
  }

  renderProducts();
  updateOrderSummary();
  updateCartBadge();
}

// ============================================================
// Cart Badge
// ============================================================
function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  const count = document.getElementById('cartCount');
  const num = Object.keys(selectedProducts).length;

  if (num > 0) {
    badge.style.display = 'flex';
    count.textContent = num;
  } else {
    badge.style.display = 'none';
  }
}

// ============================================================
// Order Summary
// ============================================================
function updateOrderSummary() {
  const listEl = document.getElementById('selectedItemsList');
  const totalEl = document.getElementById('orderTotal');
  const totalAmountEl = document.getElementById('totalAmount');
  const ids = Object.keys(selectedProducts);

  if (ids.length === 0) {
    listEl.innerHTML = '<p class="empty-selection">No items selected yet. Browse the collection above and click "Select" on the products you want to order.</p>';
    totalEl.style.display = 'none';
    return;
  }

  listEl.innerHTML = ids.map(id => {
    const item = selectedProducts[id];
    const subtotal = (item.price * item.quantity).toFixed(2);
    const isInvalid = item.quantity < item.moq;
    return `
      <div class="selected-item">
        <div class="selected-item-info">
          <div class="selected-item-name">${item.name}</div>
          <div class="selected-item-price">$${item.price.toFixed(2)} / pc &times; ${item.quantity} = $${subtotal}</div>
          <input type="number"
                 class="qty-input ${isInvalid ? 'invalid' : ''}"
                 value="${item.quantity}"
                 min="${item.moq}"
                 onchange="updateQuantity(${id}, this.value)"
                 oninput="updateQuantity(${id}, this.value)">
          <div class="qty-warning">Minimum order: ${item.moq} pcs</div>
        </div>
        <button class="remove-item" onclick="toggleProduct(${id})" title="Remove">&times;</button>
      </div>
    `;
  }).join('');

  // Calculate total
  const total = ids.reduce((sum, id) => {
    return sum + (selectedProducts[id].price * selectedProducts[id].quantity);
  }, 0);

  totalAmountEl.textContent = `$${total.toFixed(2)}`;
  totalEl.style.display = 'flex';
}

// ============================================================
// Update Quantity
// ============================================================
function updateQuantity(id, value) {
  const qty = parseInt(value) || 0;
  if (selectedProducts[id]) {
    selectedProducts[id].quantity = qty;
    updateOrderSummary();
  }
}

// ============================================================
// Form Submission
// ============================================================
function initForm() {
  const form = document.getElementById('orderForm');
  form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();

  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  // ----- Validate selection -----
  const ids = Object.keys(selectedProducts);
  if (ids.length === 0) {
    showStatus(statusEl, 'error', '⚠ Please select at least one product before submitting.');
    return;
  }

  // ----- Validate MOQ -----
  const moqViolations = ids.filter(id => selectedProducts[id].quantity < selectedProducts[id].moq);
  if (moqViolations.length > 0) {
    const names = moqViolations.map(id => selectedProducts[id].name).join(', ');
    showStatus(statusEl, 'error', `⚠ The following items don't meet the minimum order quantity: ${names}`);
    return;
  }

  // ----- Gather form data -----
  const name = document.getElementById('customerName').value.trim();
  const email = document.getElementById('customerEmail').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const country = document.getElementById('customerCountry').value.trim();
  const size = document.getElementById('sizeSelect').value;
  const notes = document.getElementById('notes').value.trim();

  // ----- Build order details string -----
  let orderDetails = '';
  let totalCost = 0;

  ids.forEach(id => {
    const item = selectedProducts[id];
    const subtotal = item.price * item.quantity;
    totalCost += subtotal;
    orderDetails += `\n• ${item.name}\n`;
    orderDetails += `  Category: ${item.category}\n`;
    orderDetails += `  Price: $${item.price.toFixed(2)} / pc\n`;
    orderDetails += `  Quantity: ${item.quantity} pcs\n`;
    orderDetails += `  Subtotal: $${subtotal.toFixed(2)}\n`;
  });

  orderDetails += `\n──────────────────────────\n`;
  orderDetails += `SIZE: ${size}\n`;
  orderDetails += `TOTAL ESTIMATED COST: $${totalCost.toFixed(2)}\n`;

  // ----- Disable button & show loading -----
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  statusEl.style.display = 'none';

  // ----- Prepare email template params -----
  const templateParams = {
    to_email: EMAILJS_CONFIG.toEmail,
    customer_name: name,
    customer_email: email,
    customer_phone: phone || 'Not provided',
    customer_country: country || 'Not provided',
    preferred_size: size,
    order_details: orderDetails,
    total_cost: `$${totalCost.toFixed(2)}`,
    notes: notes || 'No additional notes',
    reply_to: email
  };

  // ----- Send email via EmailJS -----
  try {
    // Check if EmailJS is configured
    if (EMAILJS_CONFIG.publicKey === "YOUR_PUBLIC_KEY") {
      // Demo mode — simulate success (for preview without EmailJS keys)
      console.log('=== EMAILJS NOT CONFIGURED — Demo Mode ===');
      console.log('Order details that would be emailed:\n', templateParams);
      console.log('Full order details:\n', orderDetails);

      await new Promise(r => setTimeout(r, 1500));

      showStatus(statusEl, 'success',
        `✓ Order request submitted successfully! (Demo mode — see console for order details. Configure EmailJS to receive real email notifications at ${EMAILJS_CONFIG.toEmail})`);
      resetForm();
      return;
    }

    // Real EmailJS send
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    if (response.status === 200) {
      showStatus(statusEl, 'success', '✓ Order request submitted successfully! We will contact you within 24 hours.');
      resetForm();
    } else {
      throw new Error('EmailJS returned non-200 status');
    }

  } catch (error) {
    console.error('EmailJS Error:', error);
    showStatus(statusEl, 'error',
      `⚠ There was an error sending your order. Please try again or email us directly at ${EMAILJS_CONFIG.toEmail}`);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Order Request';
  }
}

// ============================================================
// Helper Functions
// ============================================================
function showStatus(el, type, message) {
  el.className = `form-status ${type}`;
  el.textContent = message;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function resetForm() {
  document.getElementById('orderForm').reset();
  selectedProducts = {};
  renderProducts();
  updateOrderSummary();
  updateCartBadge();
}
