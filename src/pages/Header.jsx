// src/components/Header.tsx
import { ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b shadow backdrop-blur">
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
        <ShoppingCart className="w-6 h-6 text-green-600" />
        GroceryMate
      </div>
    </header>
  );
}
