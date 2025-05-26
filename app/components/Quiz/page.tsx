"use client";
import { useEffect, useState } from "react";
import { QuizQuestion } from "@/app/types/page";
export default function Quiz({
  questions,
  onComplete,
}: {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, questions]);

  const handleAnswer = (answer: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].user_answer = answer;

    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }

    setTimeout(handleNextQuestion, 500);
  };
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(15);
    } else {
      onComplete(score);
    }
  };

  if (questions.length === 0) {
    return <div className="text-center py-8">Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium">
          Question {currentQuestionIndex + 1}/{questions.length}
        </span>
        <span className="text-lg font-medium">
          Score: {score}/{questions.length}
        </span>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">
            {currentQuestion.category}
          </span>
          <span className="text-sm text-gray-500 capitalize">
            {currentQuestion.difficulty}
          </span>
        </div>

        <div className="h-2 w-full bg-gray-200 rounded-full mb-4">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          ></div>
        </div>

        <h3 className="text-xl font-medium mb-6">{currentQuestion.question}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentQuestion.all_answers?.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              disabled={!!currentQuestion.user_answer}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                !currentQuestion.user_answer
                  ? "hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer"
                  : answer === currentQuestion.correct_answer
                  ? "bg-green-100 border-green-500"
                  : currentQuestion.user_answer === answer
                  ? "bg-red-100 border-red-500"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              {decodeHTML(answer)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function shuffleArray(array: any[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function decodeHTML(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
