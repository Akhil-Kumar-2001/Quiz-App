'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';

interface CategoryFormProps {
  getCategoryData: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ getCategoryData }) => {
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/category', { categoryName });
      console.log("Category added:", response.data);
      setCategoryName('');
      getCategoryData();
      
      // Show success message
      const successMessage = document.getElementById('successMessage');
      if (successMessage) {
        successMessage.classList.remove('opacity-0');
        successMessage.classList.add('opacity-100');
      }

      // Wait for 1 second then redirect
      setTimeout(() => {
        window.location.href = '/admin/category';
      }, 1000);

    } catch (error: any) {
      console.log("Error adding category:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 mt-20 border border-gray-100">
        <div className="flex items-center justify-center mb-8">
          <PlusCircle className="w-8 h-8 text-indigo-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">New Category</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="categoryName"
              className="text-sm font-medium text-gray-700 absolute -top-6 left-2"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 ease-in-out text-gray-800 placeholder-gray-400"
              placeholder="Enter a descriptive category name"
            />
          </div>

          <div className="relative">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <span className="inline-block h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : (
                <PlusCircle className="w-5 h-5 mr-2" />
              )}
              {isLoading ? 'Adding...' : 'Add Category'}
            </button>
          </div>

          <div
            id="successMessage"
            className="opacity-0 transition-opacity duration-300 text-center text-sm text-green-600 bg-green-50 rounded-lg py-2"
          >
            Category added successfully! Redirecting...
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;