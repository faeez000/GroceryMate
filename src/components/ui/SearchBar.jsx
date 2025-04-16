import { Input } from "./input";
import { Label } from "./label";

export function SearchBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
      <div className="flex flex-col gap-1 w-full sm:w-1/2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search by item name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1 w-full sm:w-1/2">
        <Label htmlFor="category">Filter by Category</Label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white text-gray-700"
        >
          <option value="all">All Categories</option>
          {Array.from(new Set(categories)).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
