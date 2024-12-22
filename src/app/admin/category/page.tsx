'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import CategoryForm from '../../../components/categoryForm/CategoryForm'; 
import axios from 'axios';
import { categoryType } from '@/types/types';
import { Plus, Calendar, Tag } from 'lucide-react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCategoryData = async () => {
    try {
      const response = await axios.get('/api/category');
      console.log(response);
      if (response.data.categories.length > 0)
        setCategories(response.data.categories);
      else
        setCategories([]);
    } catch (error) {
      console.log("Error fetching category data");
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);
  
  const handleAddCategory = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-300">Categories</h2>
              <p className="text-gray-400 mt-1">Manage your quiz categories</p>
            </div>
            <button
              onClick={handleAddCategory}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-2.5 px-4 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add New Category
            </button>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-md m-4 transform transition-all duration-300 scale-100">
                <div className="p-6">
                  <CategoryForm getCategoryData={getCategoryData} />
                  <button
                    onClick={closeModal}
                    className="mt-4 bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 float-right"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-800 border-b border-gray-700">
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">#</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Category Name
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date Added
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {categories.map((category, index) => (
                    <tr 
                      key={category._id} 
                      className="hover:bg-gray-800 transition-colors duration-200"
                    >
                      <td className="py-4 px-6 text-sm text-gray-300">{index + 1}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-300">{category.category}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-300">
                        {new Date(category.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {categories.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No categories found. Add your first category!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
