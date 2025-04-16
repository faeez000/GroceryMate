// src/components/ui/Checkbox.jsx
import { useState, useEffect } from "react";

export default function Checkbox({ isChecked, onCheckedChange }) {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked); // Synchronize internal state with the prop when it changes
  }, [isChecked]);

  const handleCheckboxClick = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onCheckedChange(newChecked); // Notify parent component about the change
  };

  return (
    <button
      onClick={handleCheckboxClick}
      className={`relative inline-flex items-center justify-center w-6 h-6 rounded-full border-2 ${
        checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"
      } transition-all duration-300`}
    >
      <span
        className={`w-3 h-3 rounded-full ${
          checked ? "bg-white" : "bg-transparent"
        }`}
      ></span>
    </button>
  );
}
