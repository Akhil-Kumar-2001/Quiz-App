'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { categoryType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { BookOpen, ChevronDown, User } from 'lucide-react';

const QuizForm = () => {
  const [participantName, setParticipantName] = useState('');
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/category');
        if (response.data.categories && response.data.categories.length > 0) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleStartQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z]{3,}$/;
    
    if (!participantName.trim() || !selectedCategory) {
      alert('Please enter your name and select a category.');
      return;
    }
    else if(!nameRegex.test(participantName.trim())) {
      alert('Please enter a valid name');
      return;
    }

    setIsLoading(true);
    try {
      router.push(
        `/quiz?participantName=${encodeURIComponent(participantName)}&selectedCategory=${encodeURIComponent(selectedCategory)}`
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex justify-center items-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-indigo-100 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome to the Quiz</h2>
          <p className="text-gray-600 mt-2">Test your knowledge and challenge yourself!</p>
        </div>

        <form onSubmit={handleStartQuiz} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              required
              className="w-full text-black pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 bg-gray-50"
              placeholder="Enter your name"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg text-black border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 bg-gray-50 appearance-none cursor-pointer"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Starting Quiz...</span>
              </>
            ) : (
              <>
                <BookOpen className="w-5 h-5" />
                <span>Start Quiz</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Make sure to read all questions carefully before answering
        </p>
      </div>
    </div>
  );
};

export default QuizForm;