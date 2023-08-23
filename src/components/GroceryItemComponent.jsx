import React, { useState } from 'react';

const GroceryItemComponent = ({ item, handleEdit, handleDelete }) => {
  const [isEdit, setEdit] = useState(false);
  const [newItem, setNewItem] = useState(item.name);
  const [emptyEditError, setEmptyEditError] = useState(false);

  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleEditSave = () => {
    if (isEdit) {
      if (newItem.trim() !== "") {
        handleEdit(item.id, newItem);
        setEmptyEditError(false);
        setEdit(false); // Exit edit mode after saving
      } else {
        setEmptyEditError(true);
      }
    } else {
      setEdit(true); // Enter edit mode when clicking Edit
    }
  };

  return (
    <li>
      {isEdit ? (
        <div>
          <input type='text' value={newItem} onChange={handleInputChange} />
          {emptyEditError && <p className='error-text'>Item cannot be empty</p>}
        </div>
      ) : (
        <span>{item.name}</span>
      )}

      <div>
        <button onClick={handleEditSave} className='btn-edit'>
          {isEdit ? 'Save' : 'Edit'}
        </button>
        <button className='btn-delete' onClick={() => handleDelete(item.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default GroceryItemComponent;
