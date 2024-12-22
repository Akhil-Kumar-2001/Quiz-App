"use client";

import React from 'react';
import Navbar from '../../../components/navbar/Navbar';

const Homepage = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-300 drop-shadow-lg">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-lg mt-4 text-gray-400">
            Manage your quizzes, users, and results efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
