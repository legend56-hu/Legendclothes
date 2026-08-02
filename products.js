// ============================================================
// LEGEND — Product Catalog Data
// ============================================================
// Edit this file to add, remove, or modify products.
// Each product has: id, name, category, price, moq, image, description
// ============================================================

const PRODUCTS = [
  // ---------- T-shirts & Tops ----------
  {
    id: 1,
    name: "Classic Essential Tee",
    category: "T-shirts & Tops",
    price: 18.00,
    moq: 50,
    image: "images/product-1-tee.jpg",
    description: "Premium 100% organic cotton t-shirt with a relaxed fit. Perfect for everyday wear or custom branding."
  },
  {
    id: 2,
    name: "Urban Graphic Polo",
    category: "T-shirts & Tops",
    price: 25.00,
    moq: 30,
    image: "images/product-2-polo.jpg",
    description: "Modern polo shirt with embroidered detailing. Breathable pique fabric for all-day comfort."
  },

  // ---------- Hoodies & Sweatshirts ----------
  {
    id: 3,
    name: "Premium Fleece Hoodie",
    category: "Hoodies & Sweatshirts",
    price: 38.00,
    moq: 30,
    image: "images/product-3-hoodie.jpg",
    description: "Heavyweight fleece hoodie with double-lined hood and kangaroo pocket. Cozy and durable."
  },
  {
    id: 4,
    name: "Oversized Crew Sweatshirt",
    category: "Hoodies & Sweatshirts",
    price: 32.00,
    moq: 40,
    image: "images/product-4-sweatshirt.jpg",
    description: "Trendy oversized crewneck sweatshirt. French terry interior for a soft, lived-in feel."
  },

  // ---------- Pants & Bottoms ----------
  {
    id: 5,
    name: "Slim Fit Denim Jeans",
    category: "Pants & Bottoms",
    price: 42.00,
    moq: 40,
    image: "images/product-5-jeans.jpg",
    description: "Classic slim-fit denim jeans with stretch comfort. Timeless five-pocket design."
  },
  {
    id: 6,
    name: "Casual Cargo Pants",
    category: "Pants & Bottoms",
    price: 36.00,
    moq: 35,
    image: "images/product-6-cargo.jpg",
    description: "Versatile cargo pants with multiple utility pockets. Durable cotton-twill blend."
  },

  // ---------- Dresses & Formal ----------
  {
    id: 7,
    name: "Elegant Summer Dress",
    category: "Dresses & Formal",
    price: 55.00,
    moq: 20,
    image: "images/product-7-dress.jpg",
    description: "Flowing summer dress with floral print. Lightweight chiffon fabric, perfect for warm days."
  },
  {
    id: 8,
    name: "Tailored Business Suit",
    category: "Dresses & Formal",
    price: 120.00,
    moq: 10,
    image: "images/product-8-suit.jpg",
    description: "Two-piece tailored suit in classic black. Premium wool blend, sharp structured silhouette."
  }
];

// Category list for filter tabs (order matters)
const CATEGORIES = [
  "All",
  "T-shirts & Tops",
  "Hoodies & Sweatshirts",
  "Pants & Bottoms",
  "Dresses & Formal"
];
