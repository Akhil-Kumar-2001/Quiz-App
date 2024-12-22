'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar/Navbar';
import { categoryType } from '@/types/types';
import axios from 'axios';

const AddQuestionPage = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState<null | number>(null);
  const [error, setError] = useState('');

  const getCategoryData = async () => {
    try {
      const response = await axios.get('/api/category');
      setCategories(response.data.categories?.length > 0 ? response.data.categories : []);
    } catch (error) {
      setError('Error fetching categories');
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const handleOptionChange = (index: number, value: string) => {
    setOptions(options.map((opt, i) => i === index ? value : opt));

    // Ensure correct option is selected if not already set
    if (correctOption === null) {
      setCorrectOption(index);  // Automatically mark the first option as correct
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (correctOption === null) {
      setError('Please mark the correct option');
      return;
    }

    try {
      const response = await axios.post('/api/question', {
        newQuestion: {
          category: selectedCategory,
          question,
          options,
          correctOption
        }
      });

      if (response.data.status === 201) {
        setSelectedCategory('');
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectOption(null);
        alert(response.data.message);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <Navbar />
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-300 mb-8">
            Create New Question
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-800 border border-red-600 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
                className="w-full px-4 py-3 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                <option value="" disabled>Choose a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Question Text
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-3 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                placeholder="Enter your question here..."
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Answer Options
              </label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      required
                      className="w-full px-4 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder={`Option ${index + 1}`}
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={correctOption === index}
                      onChange={() => setCorrectOption(index)}
                      className="w-5 h-5 text-blue-600 border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Correct Answer</span>
                  </label>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              Submit Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionPage;
