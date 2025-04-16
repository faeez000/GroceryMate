import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Import the Select components

import { useState } from "react";

// Category to emoji mapping
const categoryEmojis = {
  fruits: "🍎",
  vegetables: "🥦",
  dairy: "🧀",
  snacks: "🍪",
  beverages: "🥤",
  meat: "🍗",
  bakery: "🥖",
  frozen: "❄️",
  other: "🛒",
};

export function EditItemModal({ currentItem, onClose, onSave }) {
  const [itemName, setItemName] = useState(currentItem.itemName);
  const [quantity, setQuantity] = useState(currentItem.quantity);
  const [category, setCategory] = useState(currentItem.category);

  const handleSave = () => {
    if (!itemName || !quantity || !category) {
      alert("All fields are required!");
      return;
    }
    onSave(itemName, quantity, category);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white p-6 rounded-md w-96">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>Update the item details below.</DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <label className="block">Item Name</label>
          <Input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block">Quantity</label>
          <Input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Category</label>
          {/* ShadCN Select Component */}
           
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent
                        side="bottom"
                        className="bg-white shadow-md border rounded-md z-50"
                      >
              {Object.entries(categoryEmojis).map(([key, emoji]) => (
                <SelectItem key={key} value={key} className="cursor-pointer px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 text-gray-700">
                  {emoji} {key.charAt(0).toUpperCase() + key.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
