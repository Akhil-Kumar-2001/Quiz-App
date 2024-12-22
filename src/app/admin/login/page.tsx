"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type formDataType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [enableLogin, setEnableLogin] = useState<boolean>(false);
  const [formData, setFormData] = useState<formDataType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (formData.email.length > 0 && formData.password.length >= 1) {
      setEnableLogin(true);
      setError(null);
    } else {
      setEnableLogin(false);
    }
  }, [formData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("FormData:", formData);
      const response = await axios.post("/api/login", formData);
      const data = response.data;
      if (data.status === 200) {
        localStorage.setItem("token", data.token);
        document.cookie = `token=${data.token}; path=/; max-age=3600;`;
        router.push("/admin/home");
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-extrabold text-center text-gray-300 mb-6">
          Admin Login
        </h1>
        <form
          className="flex flex-col gap-4"
          autoComplete="off"
          onSubmit={handleLogin}
        >
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            />
          </div>
          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}
          <button
            type="submit"
            className={`w-full py-3 font-semibold rounded-lg transition duration-200 ${
              enableLogin
                ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!enableLogin}
          >
            {enableLogin ? "Login" : "Fill the form"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
