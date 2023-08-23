import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import GroceryItemComponent from "./GroceryItemComponent";

const GroceryComponents = () => {
  const [item, setItem] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);
  const [emptyItemError, setEmptyItemError] = useState(false);

  const handleItem = () => {
    if (item.trim() !== "") {
      setGroceryItems([...groceryItems, { id: uuid(), name: item }]);
      setItem(""); // Clear the input field after adding an item
      setEmptyItemError(false); // Reset the error state
    } else {
      setEmptyItemError(true);
    }
  };

  const handleEdit = (id, newItem) => {
    const updateGroceryItems = groceryItems.map((item) => {
      if (item.id === id) {
        return { ...item, name: newItem };
      }
      return item;
    });
    setGroceryItems(updateGroceryItems);
  };

  const handleDelete = (removeId) => {
    const updatedItems = groceryItems.filter((item) => item.id !== removeId);
    setGroceryItems(updatedItems);
  };

  const handleClearAll = () => {
    setGroceryItems([]);
  };

  return (
    <div className="grocery-buddy">
      <h1>Todo List</h1>
      <div className="input-section">
        <div className="input-container">
          <input
            type="text"
            placeholder="Input your List..."
            value={item}
            onChange={(event) => setItem(event.target.value)}
          />
          <button onClick={handleItem} className="btn-add">
            Add List
          </button>
        </div>
        {emptyItemError && (
          <p className="error-text">Please enter a List</p>
        )}
      </div>
      <ul className="grocery-list">
        {groceryItems.map((item) => (
          <GroceryItemComponent
            key={item.id}
            item={item}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
      <button onClick={handleClearAll} className="btn-clear">
        Clear All
      </button>
    </div>
  );
};

export default GroceryComponents;
