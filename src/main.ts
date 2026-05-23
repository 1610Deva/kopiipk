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
    message += `• ${item.name} x ${item.quantity} = Rp ${itemTotal.toLocaleString()}\n`;
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
    (item, index) => `
  <div class="menu-card">
    <div class="menu-image-container">
      <img src="${item.image}" alt="${item.name}" class="menu-image">
      ${index < 3 ? '<span class="badge">Bestseller 🔥</span>' : ""}
    </div>
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
          <img src="/kopiipklogo1.png" alt="Kopi IPK" class="logo-img">
          <h1 class="brand-name">Kopi IPK</h1>
        </div>
        <nav class="nav-menu">
          <a href="#menu" class="nav-link">Menu</a>
          <a href="#location" class="nav-link">Lokasi</a>
          <a href="#order" class="nav-link">Pesan</a>
          <button class="cart-btn" onclick="document.querySelector('.cart-modal').style.display = 'flex'">Keranjang (0)</button>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="hero-content">
          <img src="/kopiipklogo1.png" alt="Kopi IPK Hero" class="hero-logo">
          <h2 class="hero-title">Bahan Bakar Sesi Malam Anda</h2>
          <p class="hero-subtitle">Kopi premium yang disangrai sempurna untuk fokus. Tidak ada sampah, hanya kopi berkualitas tinggi yang akan membuat Anda tetap terjaga sepanjang malam.</p>
          <a href="#menu" class="btn btn-primary">Lihat Menu</a>
        </div>
        <img src="/bg-hero.jpg" alt="Background Kopi IPK" class="bg-hero">
      </section>

      <section class="features-section">
        <div class="features-grid">
          <div class="feature-card">
            <h3>☕ Biji Kopi Pilihan</h3>
            <p>Menggunakan 100% biji kopi Nusantara berkualitas yang disangrai oleh roaster profesional.</p>
          </div>
          <div class="feature-card">
            <h3>🚀 Booster Fokus</h3>
            <p>Diformulasikan khusus dengan takaran kafein yang pas untuk menemani kamu mengejar deadline.</p>
          </div>
          <div class="feature-card">
            <h3>🛵 Layanan Cepat</h3>
            <p>Pesan dari tempat dudukmu, dan kami akan menyiapkannya dalam sekejap mata.</p>
          </div>
        </div>
      </section>

      <section id="menu" class="menu-section">
        <h3 class="section-title">Menu Andalan Kami</h3>
        <div class="menu-grid">
          ${menuHTML}
        </div>
      </section>

      <section id="location" class="location-section">
        <div class="location-container">
          <div class="location-content">
            
            <div class="location-info">
              <h3 class="location-title">Kunjungi Kedai Kami</h3>
              <p class="location-desc">Tempat ternyaman untuk nugas, ngoding, atau sekadar bersantai menikmati ekstraksi kopi terbaik di Surabaya.</p>
              
              <div class="info-list">
                <div class="info-item">
                  <div class="info-icon">📍</div>
                  <div class="info-text">
                    <strong>Alamat</strong>
                    <span>Jl. Prof. Whisnu Nurhidayat No. 99, Kawasan Kampus Terpadu, Surabaya</span>
                  </div>
                </div>
                
                <div class="info-item">
                  <div class="info-icon">🕒</div>
                  <div class="info-text">
                    <strong>Jam Operasional</strong>
                    <span>Senin - Jumat: 08.00 - 02.00 WIB<br>Sabtu - Minggu: 10.00 - 04.00 WIB</span>
                  </div>
                </div>
                
                <div class="info-item">
                  <div class="info-icon">🔌</div>
                  <div class="info-text">
                    <strong>Fasilitas</strong>
                    <span>WiFi Kencang (100Mbps), Colokan di setiap meja, Ruang Ber-AC & Smoking Area.</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="location-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126646.25708155986!2d112.63028258284536!3d-7.275443799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac47f%3A0x3027a76e352be40!2sSurabaya%2C%20Surabaya%20City%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>

          </div>
        </div>
      </section>

      <section id="order" class="order-section">
        <div class="order-content">
          <h3 class="order-title">Siap Mengejar Target Hari Ini?</h3>
          <p class="order-subtitle">Lewati antrian. Kirim pesanan Anda dengan mudah melalui WhatsApp.</p>
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
      <div class="footer-content">
        <p>&copy; 2026 Kopi IPK. Dibuat dengan passion untuk pejuang IPK.</p>
        <div class="social-links">
           <span>Instagram: @kopi.ipk</span> | <span>Tiktok: @kopi.ipk</span>
        </div>
      </div>
    </footer>
  </div>
`;