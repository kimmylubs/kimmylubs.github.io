document.getElementById("products-link").addEventListener("click", function(event) {
    event.preventDefault();
    fetchProductsData();
});

const productsData = [
    { id: 1, name: "Product 1", price: 10.99, description: "Description of Product 1" },
    { id: 2, name: "Product 2", price: 15.99, description: "Description of Product 2" },
    { id: 3, name: "Product 3", price: 20.99, description: "Description of Product 3" }
];


function fetchProductsData() {
    fetch("https://kimmylubs.github.io/Allergens")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch products data");
            }
            return response.json();
        })
        .then(products => {
            // Process the fetched products data
            displayProducts(products);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function displayProducts(products) {
    // Code to display the products on the products page
}
