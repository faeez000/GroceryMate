import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useState, useEffect } from "react";

// Emoji map for dropdown
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

export function AddItemModal({ onAddItem }) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  // Clear fields when modal is opened
  useEffect(() => {
    setItemName("");
    setQuantity("");
    setCategory("");
  }, []);

  const handleSubmit = () => {
    if (!itemName || !quantity || !category) {
      return alert("Please fill all fields");
    }

    onAddItem(itemName, quantity, category);

    // Clear fields after adding
    setItemName("");
    setQuantity("");
    setCategory("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Grocery Item</Button>
      </DialogTrigger>

      <DialogContent className="bg-white backdrop-blur-md backdrop-brightness-75 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription>Enter the item details below.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <Input
            placeholder="Quantity (e.g., 2kg or 4)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category 🍽️" />
            </SelectTrigger>

            <SelectContent
              side="bottom"
              className="bg-white shadow-md border rounded-md z-50"
            >
              {Object.entries(categoryEmojis).map(([key, emoji]) => (
                <SelectItem
                  key={key}
                  value={key}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
                >
                  {emoji} {key.charAt(0).toUpperCase() + key.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
