const productForm = document.getElementById("productForm");
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productCategoryInput = document.getElementById("productCategory");
const searchInput = document.getElementById("searchInput");

const productList = document.getElementById("productList");
const productCount = document.getElementById("productCount");
const emptyMessage = document.getElementById("emptyMessage");
const statusMessage = document.getElementById("statusMessage");
const searchMessage = document.getElementById("searchMessage");

const products = [];

productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = productNameInput.value.trim();
    const price = Number(productPriceInput.value);
    const category = productCategoryInput.value.trim();

    if (!name || !category || !Number.isFinite(price) || price <= 0) {
        statusMessage.textContent =
            "Please enter a valid name, price, and category.";
        return;
    }

    products.push({
        id: Date.now(),
        name: name,
        price: price,
        category: category
    });

    productForm.reset();
    statusMessage.textContent = "Product added successfully.";

    renderProducts();
});

searchInput.addEventListener("input", function () {
    renderProducts();
});

function renderProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredProducts = products.filter(function (product) {
        return product.name.toLowerCase().includes(searchTerm);
    });

    productList.replaceChildren();

    productCount.textContent =
        filteredProducts.length +
        (filteredProducts.length === 1 ? " product shown" : " products shown");

    emptyMessage.hidden = filteredProducts.length > 0;

    if (products.length === 0) {
        emptyMessage.textContent = "No products added yet.";
    } else if (filteredProducts.length === 0) {
        emptyMessage.textContent = "No matching products found.";
    }

    if (searchTerm && filteredProducts.length > 0) {
        searchMessage.textContent =
            filteredProducts.length + " matching product(s) found.";
    } else if (searchTerm) {
        searchMessage.textContent = "No products match your search.";
    } else {
        searchMessage.textContent = "";
    }

    filteredProducts.forEach(function (product) {
        const item = document.createElement("article");
        item.className = "product-item";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "Price: ₹" + product.price.toFixed(2);

        const category = document.createElement("p");
        category.textContent = "Category: " + product.category;

        item.append(name, price, category);
        productList.appendChild(item);
    });
}

renderProducts();
