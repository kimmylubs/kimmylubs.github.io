document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and display shop items
    fetchShopItems();
});

function fetchShopItems() {
    // Example: Fetching items from a static JSON file
    fetch("data/products.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch shop items");
            }
            return response.json();
        })
        .then(items => {
            displayShopItems(items);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function displayShopItems(items) {
    const shopItemsContainer = document.getElementById("shop-items");
    items.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.textContent = `${item.name}: $${item.price}`;
        shopItemsContainer.appendChild(itemElement);
    });
}
