import { useState } from "react";
import { useGroceryList } from "../hooks/useGroceryList";
import { AddItemModal } from "../components/ui/AddItemModal";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { ClearAllDialog } from "../components/ui/ClearAllDialog";
import { SearchBar } from "../components/ui/SearchBar";
import Checkbox from "../components/ui/Checkbox";
import { EditItemModal } from "../components/ui/EditItemModal"; // Import EditItemModal
import { DeleteConfirmationDialog } from "../components/ui/DeleteConfirmationDialog"; // Import Delete Confirmation Dialog
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  // This maps categories to food emojis
  const categoryEmojis = {
    fruits: "🍎", // Apple for fruits
    vegetables: "🥦", // Broccoli for vegetables
    dairy: "🧀", // Cheese for dairy
    snacks: "🍪", // Cookie for snacks
    beverages: "🥤", // Drink for beverages
    meat: "🍗", // Chicken drumstick for meat
    bakery: "🥖", // Bread for bakery
    frozen: "❄️", // Snowflake for frozen items
    other: "🛒", // Shopping cart for other categories
  };

  const { groceryList, addItem, removeItem, clearList, togglePurchased, updateItem, addItemBack } = useGroceryList();
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Track Delete Dialog State
  const [itemToDelete, setItemToDelete] = useState(null); // Track Item to Delete
  const [deletedItem, setDeletedItem] = useState(null); // Track deleted item for undo

  const handleAddItem = (itemName, quantity, category) => {
    if (!itemName || !quantity || !category) {
      toast.error("Please fill all fields.");
      return;
    }

    const addedDate = new Date().toLocaleString();
    const newItem = { itemName, quantity, category, addedDate };

    const result = addItem(newItem);

    if (result.success) {
      // Add new item to the top of the list using unshift
      groceryList.unshift(newItem);
      toast.success("Item added successfully!");
    } else {
      toast.warning("Duplicate item. Already exists in your list.");
    }
  };

  const handleRemoveItem = (index) => {
    // Open Delete Confirmation Dialog
    setItemToDelete(groceryList[index]); // Set the item to delete
    setIsDeleteDialogOpen(true); // Show the delete confirmation dialog
  };

  const confirmDeleteItem = () => {
    setIsDeleteDialogOpen(false); // Close the confirmation dialog
    setDeletedItem(itemToDelete); // Store the deleted item for undo

    // Delay actual deletion so the exit animation has time to play
    setTimeout(() => {
      removeItem(groceryList.indexOf(itemToDelete)); // Remove from state
      toast.success("Item deleted successfully! You can undo this action.", {
        action: {
          label: "Undo",
          onClick: undoDelete, // Implement undo action
        },
      });
      setItemToDelete(null); // Clear the temp state
    }, 300); // Match the exit animation duration (0.3s)
  };

  const undoDelete = () => {
    if (deletedItem) {
      addItemBack(deletedItem); // Function to add the deleted item back to the list
      toast.success("Item restored!");
      setDeletedItem(null); // Clear the deleted item state
    }
  };

  const openClearDialog = () => {
    setIsClearDialogOpen(true);
  };

  const closeClearDialog = () => {
    setIsClearDialogOpen(false);
  };

  const handleClearAll = () => {
    clearList();
    toast("All items cleared.");
    closeClearDialog();
  };

  const openEditModal = (item) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentItem(null);
  };

  const handleEditItem = (itemName, quantity, category) => {
    if (!itemName || !quantity || !category) {
      toast.error("Please fill all fields.");
      return;
    }

    const updatedItem = { itemName, quantity, category };
    updateItem(currentItem.id, updatedItem);
    closeEditModal();
    toast.success("Item updated successfully!");
  };

  const filteredList = groceryList.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    const matchesSearch = item.itemName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "purchased" && item.purchased) ||
      (filterStatus === "pending" && !item.purchased);

    return matchesCategory && matchesSearch && matchesStatus;
  });

  const allCategories = [...new Set(groceryList.map((item) => item.category))];

  return (
    <main className="px-6 py-8">
      <h2 className="mb-4 text-2xl font-semibold">Your Grocery List 📝</h2>

      <div className="flex items-center gap-4 mb-6">
        <AddItemModal onAddItem={handleAddItem} />
        {groceryList.length > 0 && (
          <Button
            variant="destructive"
            onClick={openClearDialog}
            className="text-white bg-red-600 hover:bg-red-700"
          >
            Clear All
          </Button>
        )}
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={allCategories}
      />

      <div className="mb-6">
        <label>Filter by Status: </label>
        <select
          className="px-3 py-2 border rounded-md bg-white text-gray-700"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Items</option>
          <option value="purchased">Purchased</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {filteredList.length === 0 ? (
        <p className="text-gray-500">No matching items found.</p>
      ) : (
        <AnimatePresence mode="popLayout">
          {filteredList.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 rounded-xl shadow-md transition-all p-4 sm:p-5 border 
                ${item.purchased ? "bg-green-100 border-green-300" : "bg-white border-blue-300"}`}
            >
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="text-lg font-semibold flex items-center gap-2 mb-1">
                    <span className="text-xl">{categoryEmojis[item.category?.toLowerCase()] || "🛒"}</span>
                    <span className={item.purchased ? "line-through text-gray-600" : "text-gray-800"}>
                      {item.itemName}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-medium text-gray-600">Quantity:</span> {item.quantity}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Category:</span> {item.category}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-medium text-gray-600">Added:</span> {item.addedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Checkbox
                    isChecked={item.purchased}
                    onCheckedChange={() => togglePurchased(index)}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => openEditModal(item)}
                >
                  ✏️ Edit
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                  onClick={() => handleRemoveItem(index)}
                >
                  🗑️ Remove
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {/* Show Edit Modal */}
      {isEditModalOpen && currentItem && (
        <EditItemModal
          currentItem={currentItem}
          onClose={closeEditModal}
          onSave={handleEditItem}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <DeleteConfirmationDialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDeleteItem}
        />
      )}

      <ClearAllDialog
        open={isClearDialogOpen}
        onClose={closeClearDialog}
        onConfirm={handleClearAll}
      />
    </main>
  );
}

export default Home;
