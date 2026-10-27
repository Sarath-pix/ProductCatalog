
const version = window.APP_VERSION || "v1";
const versionNumber = Number(version.replace("v", ""));

const form = document.getElementById("productForm");
const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const categoryInput = document.getElementById("productCategory");
const formMessage = document.getElementById("formMessage");
const catalogSection = document.getElementById("catalogSection");
const searchSection = document.getElementById("searchSection");
const searchInput = document.getElementById("searchInput");
const productList = document.getElementById("productList");
const emptyMessage = document.getElementById("emptyMessage");
const productCount = document.getElementById("productCount");

const products = [];

document.getElementById("versionBadge").textContent =
  `Version ${version.toUpperCase()}`;

if (versionNumber >= 2) {
  catalogSection.classList.remove("hidden");
}

if (versionNumber >= 3) {
  searchSection.classList.remove("hidden");
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();

  const visibleProducts = versionNumber >= 3
    ? products.filter(product => product.name.toLowerCase().includes(query))
    : products;

  productList.replaceChildren();

  visibleProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const category = document.createElement("p");
    category.textContent = `Category: ${product.category}`;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = `₹${product.price.toFixed(2)}`;

    card.append(name, category, price);
    productList.appendChild(card);
  });

  productCount.textContent =
    `${visibleProducts.length} product${visibleProducts.length === 1 ? "" : "s"}`;

  emptyMessage.classList.toggle("hidden", visibleProducts.length > 0);

  if (visibleProducts.length === 0 && query !== "" && versionNumber >= 3) {
    emptyMessage.textContent = "No matching products found.";
  } else {
    emptyMessage.textContent = "No products to display yet.";
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  const category = categoryInput.value.trim();

  if (!name || !category || !Number.isFinite(price) || price <= 0) {
    formMessage.textContent = "Enter a valid name, category, and positive price.";
    return;
  }

  products.push({
    name,
    price,
    category
  });

  form.reset();
  formMessage.textContent = `Product "${name}" added successfully.`;

  if (versionNumber >= 2) {
    renderProducts();
  }
});

searchInput.addEventListener("input", renderProducts);

renderProducts();
