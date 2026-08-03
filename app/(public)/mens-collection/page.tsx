"use client";
import { useState } from "react";
import GridDisplay from "@/components/gridDisplay";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Filters = {
  category?: string;
  type?: string;
};
const types = ["chappal", "sandals", "sliders", "shoes"];
const categories = ["office chappal", "party", "sports", "casual", "sneaker"];
export default function WomenCollectionPage() {
  const [filters, setFilters] = useState<Filters>({ category: "", type: "" });
  return (
    <main className="max-w-7xl h-full  m-auto px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl relative">
        <header className="mb-10 mt-28">
          <div className="flex items-start sm:items-end mb-4 sm:mb-10">
            <div>
              <p className="uppercase tracking-[0.4em] text-xs text-zinc-500">
                Men&#8217;s Collection
              </p>

              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-[-0.06em] mt-6">
                {filters.category?.toLocaleUpperCase() || "STYLISH PIECES"}
              </h2>
            </div>
          </div>
        </header>
        <div className="w-full py-2 mb-10 sm:flex sm:justify-end sm:w-auto   sticky sm:top-25 top-23.5 z-40 bg-background ">
          <ToggleGroup
            className="w-full sm:w-auto overflow-x-scroll sm:overflow-x-clip "
            type="single"
            size="sm"
            defaultValue=""
            variant="outline"
            spacing={2}
          >
            {types.map((type, i) => (
              <ToggleGroupItem
                key={i}
                value={type}
                aria-label={`Toggle ${type}`}
                onClick={() =>
                  setFilters({ ...filters, category: "", type: type })
                }
              >
                {type}
              </ToggleGroupItem>
            ))}
            {categories.map((category, i) => (
              <ToggleGroupItem
                key={i}
                value={category}
                aria-label={`Toggle ${category}`}
                onClick={() => setFilters({ ...filters, category: category })}
              >
                {category}
              </ToggleGroupItem>
            ))}
            <ToggleGroupItem
              value=""
              aria-label="Clear filters"
              onClick={() => setFilters({ category: "", type: "" })}
            >
              Clear Filters
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <GridDisplay
          gender="male"
          category={filters.category}
          type={filters.type}
        />
      </div>
    </main>
  );
}
