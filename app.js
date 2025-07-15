function renderProducts() {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  const sort = document.getElementById("sort")?.value || "asc";
  let list = [...PRODUCTS];

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  if (category) list = list.filter(p => p.category === category);

  list.sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price);

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img data-src="${p.img}" class="lazy" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    `;
    container.appendChild(card);
  });

  lazyLoadImages();
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ Added to cart!");
}

function lazyLoadImages() {
  const imgs = document.querySelectorAll('img.lazy');
  imgs.forEach(img => {
    img.src = img.dataset.src;
    img.classList.remove("lazy");
  });
}

window.onload = () => {
  if (document.getElementById("productList")) renderProducts();
};
