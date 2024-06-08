import React, { useState } from "react";
import { itemList } from "./database/itemList";
import { ProductList } from "./database/ProductList";

function App() {

  const [filteredProductList, setProductFilteredList] = new useState(ProductList);

  const filterBySearchProduct = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedProductList = [...ProductList];
    // Include all elements which includes the search query
    updatedProductList = updatedProductList.filter((item) => {
      return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setProductFilteredList(updatedProductList);
  };


  const [filteredList, setFilteredList] = new useState(itemList);

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...itemList];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item ) => {
      return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  };


  return (
    <div className="App">
      <div className="search-header">
        <div className="search-text">Search:</div>
        <input id="search-box" onChange={filterBySearch} />
      </div>
      <div id="item-list">
        <ul>
          {filteredList.map((item, index) => (
            <li key={index}>
              {item}
              </li>
          ))}
        </ul>
      </div>

      <div className="search-header">
        <div className="search-text">Search:</div>
        <input id="search-box" onChange={filterBySearchProduct} />
      </div>
      <div id="item-list">
        <ul>
          {filteredProductList.map((item, index) => (
            <li key={index}>
              {item}
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


document.addEventListener(App());
  // Function to fetch and display shop items
// });

export default App;

