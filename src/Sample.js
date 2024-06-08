// Sample product data (can be replaced with your actual data)
const products = [
    { name: "Product 1", description: "Description of Product 1", price: 10.99, image: "images/product1.jpg" },
    { name: "Product 2", description: "Description of Product 2", price: 15.99, image: "images/product2.jpg" },
    { name: "Product 3", description: "Description of Product 3", price: 20.99, image: "images/product3.jpg" }
];

// Function to display products
function displayProducts() {
    const productsSection = document.getElementById("products");
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;

        const name = document.createElement("h2");
        name.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("p");
        price.textContent = `$${product.price.toFixed(2)}`;

        productCard.appendChild(img);
        productCard.appendChild(name);
        productCard.appendChild(description);
        productCard.appendChild(price);

        productsSection.appendChild(productCard);
    });
}

// Call the function to display products when the page loads
window.addEventListener("load", displayProducts);
