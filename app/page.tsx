"use client";
import { useState } from "react";
import CategorySelector from "./components/Catrgory-Selector/page";
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    if (selectedCategory) {
      setQuizStarted(true);
      // You would fetch questions here based on the selected category
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mx-auto text-center">
        {!quizStarted ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Test Your Knowledge
            </h1>
            <CategorySelector onSelect={setSelectedCategory} />
            <button
              onClick={startQuiz}
              disabled={!selectedCategory}
              className={`mt-8 py-3 px-8 rounded-full font-medium text-lg transition-all ${
                selectedCategory
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Start Quiz
            </button>
          </>
        ) : (
          <div>Quiz Component Would Go Here</div>
        )}
      </div>
    </div>
  );
}
