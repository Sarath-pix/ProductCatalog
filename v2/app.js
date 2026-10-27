
const form = document.getElementById("productForm");

const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const categoryInput = document.getElementById("productCategory");

const formMessage = document.getElementById("formMessage");
const productList = document.getElementById("productList");
const productCount = document.getElementById("productCount");
const emptyMessage = document.getElementById("emptyMessage");

// Product data for this browser session
const products = [];

// Display all products in the product list
function renderProducts() {
    productList.replaceChildren();

    products.forEach(function (product) {
        const card = document.createElement("article");
        card.className = "product-card";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const category = document.createElement("p");
        category.textContent = "Category: " + product.category;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = "₹" + product.price.toFixed(2);

        card.append(name, category, price);
        productList.appendChild(card);
    });

    productCount.textContent =
        products.length + " product" +
        (products.length === 1 ? "" : "s");

    emptyMessage.style.display =
        products.length === 0 ? "block" : "none";
}

// Add a new product
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const category = categoryInput.value.trim();

    if (
        name === "" ||
        category === "" ||
        !Number.isFinite(price) ||
        price <= 0
    ) {
        formMessage.textContent =
            "Enter a valid name, category, and positive price.";
        return;
    }

    // Store the product
    products.push({
        name: name,
        price: price,
        category: category
    });

    // Update the product list
    renderProducts();

    // Show confirmation
    formMessage.textContent =
        'Product "' + name + '" added successfully.';

    // Clear the form
    form.reset();
});

// Display the initially empty product list
renderProducts();
