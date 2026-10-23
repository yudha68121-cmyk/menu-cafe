
/* ==================================
   JAVASCRIPT WEBSITE CAFE
   KOPI SENJA
================================== */

// Ganti dengan nomor WhatsApp cafe kamu.
// Gunakan kode negara 62 tanpa tanda +.
const nomorWhatsApp = "6281234567890";

// DATA MENU CAFE
const menu = [
  {
    id: 1,
    name: "Espresso",
    category: "Kopi",
    price: 12000,
    description: "Kopi hitam pekat dengan rasa kuat.",
    image: "photo-1510591509098-f4fdc6d0ff04"
  },
  {
    id: 2,
    name: "Americano",
    category: "Kopi",
    price: 15000,
    description: "Espresso dengan air panas.",
    image: "photo-1517701550927-30cf4ba1dba5"
  },
  {
    id: 3,
    name: "Cafe Latte",
    category: "Kopi",
    price: 18000,
    description: "Espresso dan susu yang lembut.",
    image: "photo-1461023058943-07fcbe16d735"
  },
  {
    id: 4,
    name: "Kopi Susu Gula Aren",
    category: "Kopi",
    price: 18000,
    description: "Kopi susu creamy dengan gula aren.",
    image: "photo-1461023058943-07fcbe16d735"
  },
  {
    id: 5,
    name: "Matcha Latte",
    category: "Non-Kopi",
    price: 20000,
    description: "Matcha dan susu yang creamy.",
    image: "photo-1515823064-d6e0c04616a7"
  },
  {
    id: 6,
    name: "Cokelat Dingin",
    category: "Non-Kopi",
    price: 16000,
    description: "Minuman cokelat manis dan segar.",
    image: "photo-1542990253-0b8be4c3b7f2"
  },
  {
    id: 7,
    name: "Es Teh Manis",
    category: "Non-Kopi",
    price: 6000,
    description: "Teh manis dingin yang menyegarkan.",
    image: "photo-1556679343-c7306c1976bc"
  },
  {
    id: 8,
    name: "Nasi Goreng",
    category: "Makanan",
    price: 18000,
    description: "Nasi goreng gurih dengan telur.",
    image: "photo-1512058564366-18510be2db19"
  },
  {
    id: 9,
    name: "Mie Goreng",
    category: "Makanan",
    price: 15000,
    description: "Mie goreng dengan bumbu pilihan.",
    image: "photo-1569718212165-3a8278d5f624"
  },
  {
    id: 10,
    name: "Roti Bakar",
    category: "Camilan",
    price: 12000,
    description: "Roti bakar dengan topping pilihan.",
    image: "photo-1520072959219-c595dc870360"
  },
  {
    id: 11,
    name: "Kentang Goreng",
    category: "Camilan",
    price: 13000,
    description: "Kentang goreng renyah dengan saus.",
    image: "photo-1573080496219-bb080dd4f877"
  },
  {
    id: 12,
    name: "Pisang Goreng",
    category: "Camilan",
    price: 10000,
    description: "Pisang goreng hangat dan renyah.",
    image: "photo-1601050690597-df0568f70950"
  }
];

// KERANJANG
const cart = {};
let activeCategory = "Semua";

// FORMAT HARGA RUPIAH
function rupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(angka);
}

// MENAMPILKAN MENU
function renderMenu() {
  const searchInput = document.getElementById("search");
  const grid = document.getElementById("menuGrid");

  if (!searchInput || !grid) return;

  const keyword = searchInput.value.toLowerCase().trim();

  const filtered = menu.filter(item => {
    const cocokKategori =
      activeCategory === "Semua" ||
      item.category === activeCategory;

    const cocokPencarian =
      item.name.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword);

    return cocokKategori && cocokPencarian;
  });

  if (filtered.length === 0) {
    grid.innerHTML =
      '<p class="empty">Menu tidak ditemukan.</p>';
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <article class="menu-card">
      <img
        src="https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=700&q=80"
        alt="${item.name}"
        loading="lazy"
        onerror="this.onerror=null;this.src='https://placehold.co/600x400/f0e4d4/70452e?text=Menu+Cafe'"
      >

      <div class="menu-info">
        <span class="category">${item.category}</span>
        <h3>${item.name}</h3>
        <p class="description">${item.description}</p>

        <div class="menu-bottom">
          <span class="price">${rupiah(item.price)}</span>

          <button
            class="add-btn"
            onclick="addToCart(${item.id})"
          >
            + Tambah
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// TAMBAH MENU KE KERANJANG
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}

// TAMBAH ATAU KURANGI JUMLAH
function changeQty(id, amount) {
  if (!cart[id]) return;

  cart[id] += amount;

  if (cart[id] <= 0) {
    delete cart[id];
  }

  renderCart();
}

// MENAMPILKAN KERANJANG
function renderCart() {
  const container = document.getElementById("cartItems");
  const totalElement = document.getElementById("totalPrice");

  if (!container || !totalElement) return;

  const ids = Object.keys(cart);
  let total = 0;

  if (ids.length === 0) {
    container.innerHTML =
      '<p class="empty">Belum ada menu yang dipilih.</p>';

    totalElement.textContent = rupiah(0);
    return;
  }

  container.innerHTML = ids.map(id => {
    const item = menu.find(m => m.id === Number(id));
    const qty = cart[id];
    const subtotal = item.price * qty;

    total += subtotal;

    return `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <small>${rupiah(item.price)} × ${qty}</small>
        </div>

        <div class="quantity">
          <button
            onclick="changeQty(${id}, -1)"
            aria-label="Kurangi ${item.name}"
          >−</button>

          <span>${qty}</span>

          <button
            onclick="changeQty(${id}, 1)"
            aria-label="Tambah ${item.name}"
          >+</button>
        </div>
      </div>
    `;
  }).join("");

  totalElement.textContent = rupiah(total);
}

// CHECKOUT MELALUI WHATSAPP
function checkout() {
  const ids = Object.keys(cart);

  if (ids.length === 0) {
    alert("Silakan pilih menu terlebih dahulu!");
    return;
  }

  if (!/^\d{10,15}$/.test(nomorWhatsApp)) {
    alert("Nomor WhatsApp cafe belum benar.");
    return;
  }

  let total = 0;

  let pesan =
    "Halo Kopi Senja, saya ingin memesan:\n\n";

  ids.forEach(id => {
    const item = menu.find(m => m.id === Number(id));
    const qty = cart[id];
    const subtotal = item.price * qty;

    total += subtotal;

    pesan +=
      `${item.name} x${qty} = ${rupiah(subtotal)}\n`;
  });

  pesan += `\nTotal pesanan: ${rupiah(total)}`;
  pesan += "\nMohon konfirmasi pesanan saya. Terima kasih!";

  const url =
    "https://wa.me/" +
    nomorWhatsApp +
    "?text=" +
    encodeURIComponent(pesan);

  window.open(url, "_blank");
}

// FILTER KATEGORI
function setupFilters() {
  document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;

      document.querySelectorAll(".filter").forEach(btn => {
        btn.classList.toggle("active", btn === button);
      });

      renderMenu();
    });
  });
}

// PENCARIAN MENU
function setupSearch() {
  const searchInput = document.getElementById("search");

  if (searchInput) {
    searchInput.addEventListener("input", renderMenu);
  }
}

// JALANKAN WEBSITE
document.addEventListener("DOMContentLoaded", () => {
  setupSearch();
  setupFilters();
  renderMenu();
  renderCart();
});
