
// ─── DATA ───
const allProducts = [
  { 
    id:1, name:'Monstera Deliciosa', type:'indoor', 
    img:'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600', 
    category:'tropical', price:29.99, oldPrice:39.99, pot:'6"', leaves:'12', care:['Low Water','Med Light','Non-Toxic'], rating:4.9, reviews:127, badge:'Popular', desc:'The iconic Swiss cheese plant. Perfect for bright rooms, with stunning split leaves that grow dramatically over time.' 
  },
  { 
    id:2, name:'Desert Barrel Cactus', type:'outdoor', 
img:'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600',    category:'succulent', price:14.99, oldPrice:null, pot:'4"', leaves:'—', care:['Minimal Water','Full Sun','Easy Care'], rating:4.7, reviews:84, badge:'', desc:'A low-maintenance beauty that thrives in sunny spots. Stores water efficiently — ideal for busy plant parents.' 
  },
  { 
    id:3, name:'Peace Lily', type:'indoor', 
    img:'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600', 
    category:'tropical', price:22.99, oldPrice:null, pot:'5"', leaves:'8', care:['Med Water','Low Light','Air Purifier'], rating:4.8, reviews:203, badge:'New', desc:'Elegant white blooms with glossy leaves. Excellent air purifier and thrives even in low-light corners.' 
  },
   { 
    id:7, name:'ZZ Plant', type:'indoor', 
img:'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&w=600',    category:'indoor', price:24.99, oldPrice:null, pot:'6"', leaves:'10', care:['Low Water','Any Light','Beginner Friendly'], rating:5.0, reviews:189, badge:'', desc:'Nearly indestructible — thrives on neglect. Glossy leaves and air-purifying qualities make it a top choice.' 
  },
  
  { 
    id:5, name:'String of Pearls', type:'indoor', 
    img:'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=600', 
    category:'succulent', price:18.99, oldPrice:null, pot:'4"', leaves:'trailing', care:['Low Water','Bright Light','Trailing'], rating:4.9, reviews:62, badge:'New', desc:'A cascading succulent with bead-like leaves. Perfect for hanging baskets and high shelves.' 
  },
  { 
    id:6, name:'Bird of Paradise', type:'outdoor', 
    img:'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=600', 
    category:'tropical', price:59.99, oldPrice:79.99, pot:'10"', leaves:'20', care:['Med Water','Full Sun','Bold'], rating:4.8, reviews:44, badge:'Sale', desc:'Stunning tropical plant with large paddle-shaped leaves. Creates a resort-like atmosphere on patios and balconies.' 
  },
 { 
    id:4, name:'Fiddle Leaf Fig', type:'indoor', 
img:'https://images.pexels.com/photos/3511755/pexels-photo-3511755.jpeg?auto=compress&w=600',    category:'tropical', price:49.99, oldPrice:64.99, pot:'8"', leaves:'15', care:['Med Water','Bright Light','Statement Plant'], rating:4.6, reviews:96, badge:'Sale', desc:'The queen of interior plants. Large, violin-shaped leaves make a dramatic statement in any living space.' 
  },
  { 
    id:8, name:'Aloe Vera', type:'outdoor', 
    img:'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600', 
    category:'succulent', price:12.99, oldPrice:null, pot:'4"', leaves:'6', care:['Low Water','Full Sun','Medicinal'], rating:4.7, reviews:312, badge:'Popular', desc:'The world\'s most beloved succulent. Soothing gel inside, drought tolerant, and incredibly easy to care for.' 
  },
];

let cart = [];
let currentFilter = 'all';
let currentSort = 'default';
let selectedRating = 0;
let reviews = [
  { name:'Fatima K.', rating:5, text:'Absolutely love my Monstera! Arrived perfectly packed and has been thriving for months. The care instructions included were super helpful.', date:'March 2025' },
  { name:'Ahmed R.', rating:5, text:'The ZZ Plant I ordered is stunning. Perfect for my low-light apartment and it\'s been growing beautifully. Will definitely order again!', date:'February 2025' },
  { name:'Sara M.', rating:4, text:'Great selection and fast delivery. My Peace Lily is flowering already — within 3 weeks of arrival. Customer service was very responsive.', date:'January 2025' },
];

// ─── RENDER PRODUCTS ───
function renderProducts() {
  let filtered = allProducts.filter(p => {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchFilter = currentFilter === 'all' || p.type === currentFilter || p.category === currentFilter;
    return matchSearch && matchFilter;
  });

  if (currentSort === 'price-asc') filtered.sort((a,b) => a.price - b.price);
  else if (currentSort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  else if (currentSort === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name));
  else if (currentSort === 'rating') filtered.sort((a,b) => b.rating - a.rating);

  const grid = document.getElementById('productsGrid');
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:3rem;font-size:1.1rem;">🌵 No plants found. Try a different search.</p>';
    return;
  }
  grid.innerHTML = filtered.map(p => `
    <div class="product-card reveal" onclick="openProductModal(${p.id})">
      ${p.badge ? `<div class="product-badge ${p.badge==='New'?'new':''}">${p.badge}</div>` : ''}
<div class="product-img"><img src="${p.img}" alt="${p.name}"></div>      <div class="product-info">
        <div class="product-type">${p.type} · ${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-meta">
          <span>🪴 ${p.pot} pot</span>
          <span>⭐ ${p.rating} (${p.reviews})</span>
        </div>
        <div class="product-care">${p.care.map(c=>`<span class="care-tag">${c}</span>`).join('')}</div>
        <div class="product-footer">
          <div class="product-price">
            ${p.oldPrice ? `<span class="old">$${p.oldPrice}</span>` : ''}$${p.price}
          </div>
          <button class="add-to-cart" onclick="event.stopPropagation();addToCart(${p.id})" title="Add to cart">+</button>
        </div>
      </div>
    </div>
  `).join('');
  observeReveal();
}

function filterProducts() { renderProducts(); }
function setFilter(val, el) {
  currentFilter = val;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderProducts();
}
function sortProducts(val) { currentSort = val; renderProducts(); }

// ─── PRODUCT MODAL ───
function openProductModal(id) {
  const p = allProducts.find(x => x.id === id);
document.getElementById('pmEmoji').innerHTML = `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:0;">`;
  document.getElementById('pmType').textContent = p.type.toUpperCase() + ' · ' + p.category.toUpperCase();
  document.getElementById('pmName').textContent = p.name;
  document.getElementById('pmStars').textContent = '★'.repeat(Math.round(p.rating)) + ` ${p.rating} (${p.reviews} reviews)`;
  document.getElementById('pmDesc').textContent = p.desc;
  document.getElementById('pmPrice').textContent = (p.oldPrice ? `$${p.oldPrice}  ` : '') + `$${p.price}`;
  document.getElementById('pmDetails').innerHTML = `
    <div class="pm-detail"><strong>Pot Size:</strong>${p.pot}</div>
    <div class="pm-detail"><strong>Care:</strong>${p.care.join(', ')}</div>
    <div class="pm-detail"><strong>Type:</strong>${p.type}</div>
  `;
  document.getElementById('pmAddBtn').onclick = () => { addToCart(id); closeProductModal(); };
  document.getElementById('productModal').classList.add('open');
}
function closeProductModal() { document.getElementById('productModal').classList.remove('open'); }

// ─── CART ───
function addToCart(id) {
  const p = allProducts.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...p, qty: 1 });
  updateCart();
  showToast(`🌿 ${p.name} added to cart!`);
}

function updateCart() {
  const count = cart.reduce((s,i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = count;
  const items = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    items.innerHTML = '<div class="cart-empty"><div class="empty-icon">🪴</div><p>Your cart is empty.<br>Add some plants!</p></div>';
    footer.style.display = 'none';
    return;
  }
  footer.style.display = 'block';
  items.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${item.id})">🗑</button>
    </div>
  `).join('');
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  updateCart();
}
function removeFromCart(id) { cart = cart.filter(x => x.id !== id); updateCart(); }

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

function checkout() {
  if (cart.length === 0) return;
  cart = []; updateCart(); toggleCart();
  showToast('✅ Order placed! Thank you for shopping with us.');
}

// ─── REVIEWS ───
function renderReviews() {
  document.getElementById('reviewsGrid').innerHTML = reviews.map(r => `
    <div class="review-card reveal">
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      <div class="review-text">${r.text}</div>
      <div class="reviewer">
        <div class="reviewer-avatar">${r.name[0]}</div>
        <div><div class="reviewer-name">${r.name}</div><div class="reviewer-date">${r.date}</div></div>
      </div>
    </div>
  `).join('');
  observeReveal();
}

function openReviewModal() { document.getElementById('reviewModal').classList.add('open'); }
function closeReviewModal() {
  document.getElementById('reviewModal').classList.remove('open');
  document.getElementById('reviewName').value = '';
  document.getElementById('reviewText').value = '';
  selectedRating = 0;
  updateStars();
}

function setRating(val) { selectedRating = val; updateStars(); }
function updateStars() {
  document.querySelectorAll('.star-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.val) <= selectedRating);
  });
}

function submitReview() {
  const name = document.getElementById('reviewName').value.trim();
  const text = document.getElementById('reviewText').value.trim();
  let valid = true;

  if (!name) { showErr('reviewNameErr', 'reviewName'); valid = false; } else { hideErr('reviewNameErr', 'reviewName'); }
  if (!selectedRating) { document.getElementById('reviewRatingErr').classList.add('show'); valid = false; } else { document.getElementById('reviewRatingErr').classList.remove('show'); }
  if (!text) { showErr('reviewTextErr', 'reviewText'); valid = false; } else { hideErr('reviewTextErr', 'reviewText'); }

  if (!valid) return;

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const now = new Date();
  reviews.unshift({ name, rating: selectedRating, text, date: `${months[now.getMonth()]} ${now.getFullYear()}` });
  renderReviews();
  closeReviewModal();
  showToast('⭐ Thank you for your review!');
}

// ─── CONTACT ───
function sendContact() {
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const msg = document.getElementById('contactMessage').value.trim();
  let valid = true;

  if (!name) { showErr('contactNameErr','contactName'); valid=false; } else { hideErr('contactNameErr','contactName'); }
  if (!email || !email.includes('@') || !email.includes('.')) { showErr('contactEmailErr','contactEmail'); valid=false; } else { hideErr('contactEmailErr','contactEmail'); }
  if (!msg) { showErr('contactMessageErr','contactMessage'); valid=false; } else { hideErr('contactMessageErr','contactMessage'); }

  if (!valid) return;

  document.getElementById('contactName').value = '';
  document.getElementById('contactEmail').value = '';
  document.getElementById('contactMessage').value = '';
  document.getElementById('contactSubject').selectedIndex = 0;
  showToast('📬 Message sent! We\'ll get back to you soon.');
}

// ─── HELPERS ───
function showErr(errId, inputId) {
  document.getElementById(errId).classList.add('show');
  document.getElementById(inputId).classList.add('input-error');
}
function hideErr(errId, inputId) {
  document.getElementById(errId).classList.remove('show');
  document.getElementById(inputId).classList.remove('input-error');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ─── SCROLL ───
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
});

function observeReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('open'); }
function closeMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

// Close modals on overlay click
document.getElementById('reviewModal').addEventListener('click', function(e) { if(e.target===this) closeReviewModal(); });
document.getElementById('productModal').addEventListener('click', function(e) { if(e.target===this) closeProductModal(); });

// ─── INIT ───
renderProducts();
renderReviews();
observeReveal();

// ═══════════════════════════════════
//  DARK / LIGHT MODE
// ═══════════════════════════════════

function toggleDarkMode() {
  const body = document.body;
  const btn = document.getElementById('themeToggle');
  const isDark = body.classList.toggle('dark');

  // Update button label
  btn.textContent = isDark ? '☀️ Light' : '🌙 Dark';

  // Save preference so it remembers after refresh
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// On page load — restore saved theme
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = '☀️ Light';
  }
})();

