"use client";
import { useState } from "react";
import { quizCategories } from "@/app/category/page";
export default function CategorySelector({
  onSelect,
}: {
  onSelect: (id: number) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Choose a Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {quizCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              onSelect(category.id);
            }}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedCategory === category.id
                ? "border-indigo-500 scale-105"
                : "border-gray-200 hover:border-indigo-300"
            } ${category.color} flex flex-col items-center`}
          >
            <span className="text-2xl mb-2">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
