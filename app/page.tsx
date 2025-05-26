import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8  max-w-2x mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Test Your Knowledge
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Challenge yourself with our interactive quiz. Are you ready to prove
          your skills?
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg cursor-pointer text-lg">
          Start Quiz
        </button>

        <div className="mt-12 flex justify-center space-x-5">
          <div className="text-center p-1 rounded-lg hover:bg-indigo-50 hover:scale-110 transition-all cursor-pointer">
            <div className="text-3xl font-bold text-indigo-600">10+</div>
            <div className="text-gray-500">Categories</div>
          </div>
          <div className="text-center p-1 rounded-lg hover:bg-indigo-50 hover:scale-110 transition-all cursor-pointer">
            <div className="text-3xl font-bold text-indigo-600">100+</div>
            <div className="text-gray-500">Questions</div>
          </div>
          <div className="text-center p- rounded-lg hover:bg-indigo-50 hover:scale-110 transition-all cursor-pointer">
            <div className="text-3xl font-bold text-indigo-600">5</div>
            <div className="text-gray-500">Difficulty Levels</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
