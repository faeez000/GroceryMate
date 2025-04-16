import { useState, useEffect } from "react";

export function useGroceryList() {
  const loadItems = () => {
    const savedItems = localStorage.getItem("groceryItems");
    if (savedItems) {
      const items = JSON.parse(savedItems);
      // Ensure each item has a unique id
      return items.map(item => {
        if (!item.id) {
          // If the item doesn't have an id, generate one
          return { ...item, id: Date.now() + Math.random() }; // Unique ID based on timestamp + random value
        }
        return item;
      });
    }
    return [];
  };

  const [groceryList, setGroceryList] = useState(loadItems);
  const [deletedItem, setDeletedItem] = useState(null); // Track the deleted item for undo

  useEffect(() => {
    // Store the grocery list with ids in localStorage
    localStorage.setItem("groceryItems", JSON.stringify(groceryList));
  }, [groceryList]);

  const addItem = (item) => {
    const isDuplicate = groceryList.some(
      (existingItem) =>
        existingItem.itemName.toLowerCase() === item.itemName.toLowerCase() &&
        existingItem.category.toLowerCase() === item.category.toLowerCase()
    );

    if (isDuplicate) {
      return { success: false };
    }

    const newItem = { ...item, id: Date.now() + Math.random() }; // Assign unique id when adding new item

    // Add new item to the top of the list
    setGroceryList((prev) => [newItem, ...prev]);

    return { success: true };
  };

  const removeItem = (index) => {
    const itemToRemove = groceryList[index]; // Get the item to delete
    setDeletedItem(itemToRemove); // Store it for the undo functionality

    setGroceryList((prev) => prev.filter((_, i) => i !== index));
  };

  const addItemBack = (item) => {
    // Restore the deleted item
    setGroceryList((prev) => [item, ...prev]); // Add the item back to the top
    setDeletedItem(null); // Clear the deleted item after it's restored
  };

  const clearList = () => {
    setGroceryList([]);
  };

  const togglePurchased = (index) => {
    setGroceryList((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const updateItem = (id, updatedData) => {
    setGroceryList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
  };

  return {
    groceryList,
    addItem,
    removeItem,
    clearList,
    togglePurchased,
    updateItem,
    addItemBack, // Expose the addItemBack function to restore deleted items
    deletedItem, // Expose deletedItem to track the item for undo
  };
}
