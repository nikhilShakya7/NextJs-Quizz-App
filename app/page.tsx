"use client";
import { useState } from "react";
import { quizCategories } from "@/app/category/categories";
import { Question, QuizQuestion } from "./types/types";
import Quiz from "./components/Quiz/quiz";
function transformQuestions(apiQuestions: Question[]): QuizQuestion[] {
  return apiQuestions.map(
    (q: Question): QuizQuestion => ({
      ...q,
      all_answers: [...q.incorrect_answers, q.correct_answer].sort(
        () => Math.random() - 0.5
      ),
      user_answer: undefined,
      question: decodeHTML(q.question),
    })
  );
}

function decodeHTML(html: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function ChooseCategory() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = async () => {
    if (!selectedCategory) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${selectedCategory}`
      );
      const data = await response.json();

      if (data.response_code !== 0 || !data.results) {
        throw new Error("Failed to fetch questions");
      }

      const transformedQuestions = transformQuestions(data.results);
      setQuestions(transformedQuestions);
      setQuizStarted(true);
      setQuizCompleted(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizComplete = (score: number) => {
    setFinalScore(score);
    setQuizCompleted(true);
    setQuizStarted(false);
  };

  const restartQuiz = () => {
    setSelectedCategory(null);
    setQuizCompleted(false);
    setFinalScore(0);
    setQuestions([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mx-auto">
        {!quizStarted && !quizCompleted ? (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Choose Quiz Category
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {quizCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
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
            {error && (
              <div className="text-red-500 text-center my-4">{error}</div>
            )}
            <button
              onClick={startQuiz}
              disabled={!selectedCategory || isLoading}
              className={`mt-8 w-full py-3 px-8 rounded-full font-medium text-lg transition-all ${
                selectedCategory && !isLoading
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Loading..." : "Start Quiz"}
            </button>
          </>
        ) : quizStarted ? (
          <Quiz questions={questions} onComplete={handleQuizComplete} />
        ) : (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Quiz Completed!</h2>
            <p className="text-xl">
              Your score: {finalScore}/{questions.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-indigo-600 h-4 rounded-full"
                style={{ width: `${(finalScore / questions.length) * 100}%` }}
              ></div>
            </div>
            <button
              onClick={restartQuiz}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full transition-all hover:scale-105 w-full"
            >
              Start New Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
