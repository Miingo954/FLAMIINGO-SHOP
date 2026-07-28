const productGrid = document.querySelector('#productGrid');
const cartItems = document.querySelector('#cartItems');
let cart = [];

function renderProducts() {
  productGrid.innerHTML = products.map((product, index) => `
    <article class="product-card">
      <div class="product-image" style="background-image:url('${product.image}')">${product.badge ? `<span class="badge">${product.badge}</span>` : ''}</div>
      <div class="product-info"><span>${product.name}<br>${product.price}</span><button class="add-product" data-index="${index}" aria-label="Add ${product.name} to bag">+</button></div>
    </article>`).join('');
}

function renderCart() {
  document.querySelector('#cartCount').textContent = cart.length;
  cartItems.innerHTML = cart.length ? cart.map(item => `<div class="cart-item"><span>${item.name}</span><strong>${item.price}</strong></div>`).join('') : '<p class="empty-state">Your bag is empty.</p>';
}

function closeDrawers() {
  document.querySelectorAll('.drawer').forEach(drawer => { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); });
  document.querySelector('#scrim').classList.remove('visible');
}

function openDrawer(id) {
  closeDrawers();
  const drawer = document.querySelector(id);
  drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false');
  document.querySelector('#scrim').classList.add('visible');
}

document.querySelector('#menuButton').addEventListener('click', () => openDrawer('#menuDrawer'));
document.querySelector('#cartButton').addEventListener('click', () => openDrawer('#cartDrawer'));
document.querySelectorAll('[data-close], #scrim').forEach(element => element.addEventListener('click', closeDrawers));
document.querySelector('#searchButton').addEventListener('click', () => document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' }));
document.querySelector('#filterButton').addEventListener('click', () => alert('Connect this button to your store filters.'));
productGrid.addEventListener('click', event => { const button = event.target.closest('.add-product'); if (!button) return; cart.push(products[button.dataset.index]); renderCart(); openDrawer('#cartDrawer'); });
document.querySelector('#newsletterForm').addEventListener('submit', event => { event.preventDefault(); document.querySelector('#formMessage').textContent = 'Thanks — you are on the list.'; event.target.reset(); });

renderProducts();