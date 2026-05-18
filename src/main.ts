import "./style.css";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Es Kopi Susu 4.0",
    description: "Espresso klasik dengan susu premium dan gula aren",
    price: 18000,
    image:
      "https://siroca.co.id/wp-content/uploads/2023/08/cappuccino-6996425_1280.jpg.webp",
  },
  {
    name: "Americano Skripsi",
    description: "Kopi hitam pekat dengan double shot espresso",
    price: 15000,
    image: "https://miro.medium.com/1*6eQJzYpORcnTJp8k5iHq7Q.jpeg",
  },
  {
    name: "Matcha Cum Laude",
    description: "Matcha premium Uji dengan susu segar",
    price: 22000,
    image:
      "https://foodbyjonister.com/wp-content/uploads/2019/05/IcedMatcha4-1008x1300.jpg",
  },
  {
    name: "Cappuccino Mantap",
    description: "Perpaduan sempurna espresso dan crema susu",
    price: 20000,
    image:
      "https://guentercoffee.com/cdn/shop/articles/anleitung-cappuccino-blogheader_749c310f-0dc4-4a54-8fdc-351bd3b33cd6.jpg?v=1778077512&width=1440",
  },
  {
    name: "Latte Lezat",
    description: "Kopi susu dengan topping foam yang creamy",
    price: 21000,
    image:
      "https://myeverydaytable.com/wp-content/uploads/2025/04/Latte_0_7.jpg",
  },
  {
    name: "Espresso Tunggal",
    description: "Single shot espresso murni tanpa campuran",
    price: 12000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0FX6zGG2AdgZqrWbK-4vVI90hr2ZAFW32-g&s",
  },
  {
    name: "Cold Brew Original",
    description: "Kopi dingin premium dengan rasa yang smooth",
    price: 19000,
    image:
      "https://www.aeki-aice.org/wp-content/uploads/2025/02/Cold-Brew-Coffee.jpg",
  },
  {
    name: "Affogato Istimewa",
    description: "Es krim vanilla dengan espresso panas yang menggugah",
    price: 23000,
    image:
      "https://static01.nyt.com/images/2021/08/15/magazine/affogato/affogato-videoSixteenByNineJumbo1600-v2.jpg",
  },
  {
    name: "Caramel Macchiato",
    description: "Macchiato dengan sirup karamel yang nikmat",
    price: 22000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyqm4pvnGZ6WXoKOG1Pm1owJoDEqnFsd956w&s",
  },
  {
    name: "Flat White Premium",
    description: "Microfoam latte dengan espresso yang kuat",
    price: 21000,
    image:
      "https://perfectdailygrind.com/wp-content/uploads/2018/11/flat-white-1024x640.jpg",
  },
  {
    name: "Mocha Chocolate",
    description: "Perpaduan kopi, cokelat, dan susu yang lezat",
    price: 23000,
    image:
      "https://images.immediate.co.uk/production/volatile/sites/2/2021/11/Mocha-1fc71f7.png?quality=90&resize=708,643",
  },
  {
    name: "Cortado Express",
    description: "Espresso double dengan susu dalam porsi kecil",
    price: 16000,
    image:
      "https://127137217.cdn6.editmysite.com/uploads/1/2/7/1/127137217/3IFMTXPEW5FEI2BPJ6HBVWCE.jpeg",
  },
];

const cart: CartItem[] = [];

function updateCart() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartBtn = document.querySelector(".cart-btn") as HTMLElement;
  if (cartBtn) {
    cartBtn.textContent = `Keranjang (${cartCount})`;
  }

  const cartItems = document.querySelector(".cart-items") as HTMLElement;
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Keranjang kosong</p>';
    } else {
      cartItems.innerHTML = cart
        .map(
          (item, idx) => `
        <div class="cart-item">
          <div class="item-info">
            <span class="item-name">${item.name}</span>
            <span class="item-price">Rp ${item.price.toLocaleString()}</span>
          </div>
          <div class="item-controls">
            <button class="qty-btn" onclick="window.changeQty(${idx}, -1)">−</button>
            <span class="qty">${item.quantity}</span>
            <button class="qty-btn" onclick="window.changeQty(${idx}, 1)">+</button>
            <button class="remove-btn" onclick="window.removeItem(${idx})">Hapus</button>
          </div>
        </div>
      `,
        )
        .join("");
    }
  }

  const totalElement = document.querySelector(".cart-total") as HTMLElement;
  if (totalElement) {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    totalElement.textContent = `Total: Rp ${total.toLocaleString()}`;
  }
}

const addToCart = (name: string, price: number) => {
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
  const cartModal = document.querySelector(".cart-modal") as HTMLElement;
  if (cartModal) cartModal.style.display = "flex";
};

const changeQty = (idx: number, change: number) => {
  if (cart[idx]) {
    cart[idx].quantity += change;
    if (cart[idx].quantity <= 0) {
      cart.splice(idx, 1);
    }
    updateCart();
  }
};

const removeItem = (idx: number) => {
  cart.splice(idx, 1);
  updateCart();
};

const closeCart = () => {
  const cartModal = document.querySelector(".cart-modal") as HTMLElement;
  if (cartModal) cartModal.style.display = "none";
};

const generateWhatsApp = () => {
  if (cart.length === 0) {
    alert("Silakan tambahkan menu ke keranjang terlebih dahulu");
    return;
  }

  let message = "Halo Kopi IPK, saya ingin memesan:\n\n";

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    message += `• ${item.name} x${item.quantity} = Rp ${itemTotal.toLocaleString()}\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `\nTotal: Rp ${total.toLocaleString()}\n\nTerima kasih!`;

  const waLink = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
  window.open(waLink, "_blank");
};

(window as any).addToCart = addToCart;
(window as any).changeQty = changeQty;
(window as any).removeItem = removeItem;
(window as any).closeCart = closeCart;
(window as any).generateWhatsApp = generateWhatsApp;

const menuHTML = menuItems
  .map(
    (item) => `
  <div class="menu-card">
    <img src="${item.image}" alt="${item.name}" class="menu-image">
    <div class="card-header">
      <h4 class="card-title">${item.name}</h4>
    </div>
    <div class="card-divider"></div>
    <p class="card-description">${item.description}</p>
    <div class="card-footer">
      <p class="card-price">Rp ${item.price.toLocaleString()}</p>
      <button class="btn-add" onclick="window.addToCart('${item.name}', ${item.price})">Tambah</button>
    </div>
  </div>
`,
  )
  .join("");

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <header class="navbar">
      <div class="nav-content">
        <div class="logo-section">
          <img src="/kopiipklogo.png" alt="Kopi IPK" class="logo-img">
          <h1 class="brand-name">Kopi IPK</h1>
        </div>
        <nav class="nav-menu">
          <a href="#menu" class="nav-link">Menu</a>
          <a href="#order" class="nav-link">Pesan</a>
          <button class="cart-btn" onclick="document.querySelector('.cart-modal').style.display = 'flex'">Keranjang (0)</button>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="hero-content">
          <img src="/kopiipklogo.png" alt="Kopi IPK Hero" class="hero-logo">
          <h2 class="hero-title">Bahan Bakar Sesi Malam Anda</h2>
          <p class="hero-subtitle">Kopi premium yang disangrai sempurna untuk fokus. Tidak ada sampah, hanya kopi berkualitas tinggi yang akan membuat Anda tetap terjaga sepanjang malam.</p>
          <a href="#menu" class="btn btn-primary">Lihat Menu</a>
        </div>
      </section>

      <section id="menu" class="menu-section">
        <h3 class="section-title">Menu Andalan Kami</h3>
        <div class="menu-grid">
          ${menuHTML}
        </div>
      </section>

      <section id="order" class="order-section">
        <div class="order-content">
          <h3 class="order-title">Siap Memesan?</h3>
          <p class="order-subtitle">Lewati antrian. Kirim pesanan Anda melalui WhatsApp.</p>
          <button class="btn btn-secondary" onclick="window.generateWhatsApp()">Pesan via WhatsApp</button>
        </div>
      </section>
    </main>

    <div class="cart-modal">
      <div class="cart-content">
        <div class="cart-header">
          <h3>Keranjang Anda</h3>
          <button class="close-cart" onclick="window.closeCart()">×</button>
        </div>
        <div class="cart-items"></div>
        <div class="cart-total">Total: Rp 0</div>
        <div class="cart-actions">
          <button class="btn btn-secondary" onclick="window.generateWhatsApp()">Lanjut ke WhatsApp</button>
          <button class="btn btn-cancel" onclick="window.closeCart()">Tutup</button>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>&copy; 2026 Kopi IPK. Dibuat dengan passion</p>
    </footer>
  </div>
`;
