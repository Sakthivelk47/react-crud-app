import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import "./App.css";
function App() {
  const [items, setItems] = useState([
    { id: 1, name: "samsung", price: 1000, checked: true },
    { id: 2, name: "apple", price: 1200, checked: false },
    { id: 3, name: "oneplus", price: 900, checked: true }
  ]);

  const [newItem, setNewItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleUpdate = (item) => {
    const updatedItems = items.map((i) =>
      i.id === item.id ? { ...i, checked: !i.checked } : i
    );
    setItems(updatedItems);
  };


  const handleDelete = (item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
  }
  const handleAdd = () => {
    if (!newItem.trim()) return;

    const itemToAdd = {
      id: items.length + 1,
      name: newItem,
      checked: false
    };

    setItems([...items, itemToAdd]);
    setNewItem("");
  };

  const startEdit = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
    setNewItem(item.name);
  };

  const handleEdit = () => {
    const updatedItems = items.map((i) =>
      i.id === currentItem.id ? { ...i, name: newItem } : i
    );

    setItems(updatedItems);
    setNewItem("");
    setIsEditing(false);
    setCurrentItem(null);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Add or edit item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />

      <button onClick={isEditing ? handleEdit : handleAdd}>
        {isEditing ? "Update" : "Add"}
      </button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleUpdate(item)}
            />

            {item.name}

            <CiEdit
              role="button"
              tabIndex={0}
              onClick={() => startEdit(item)}
              style={{ marginLeft: "8px", cursor: "pointer" }}
            />

            <MdDelete
              role="button"
              tabIndex={0}
              onClick={() => handleDelete(item)}
              style={{ marginLeft: "8px", cursor: "pointer" }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
