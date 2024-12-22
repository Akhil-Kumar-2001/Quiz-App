// import React, { useState } from "react";
// import {
//   FaList,
//   FaQuestionCircle,
//   FaChartBar,
//   FaAngleRight,
// } from "react-icons/fa";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const Navbar = () => {
//   const [activeItem, setActiveItem] = useState("");
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       const response = await fetch("/api/logout", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         // Redirect to login page or home page after successful logout
//         router.push("/admin/login"); // Adjust this path as needed
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   const navItems = [
//     { icon: FaList, label: "Category", href: "/admin/category" },
//     { icon: FaQuestionCircle, label: "Question", href: "/admin/question" },
//     { icon: FaChartBar, label: "Logout", onClick: handleLogout },
//   ];

//   return (
//     <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
//       <div className="p-6">
//         <Link
//           href="/admin/home"
//           className="block text-2xl font-bold text-white text-center hover:text-indigo-400 transition-colors duration-200"
//         >
//           <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
//             Admin Panel
//           </span>
//         </Link>
//       </div>

//       <nav className="mt-8 px-4">
//         <ul className="space-y-2">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <li key={item.label}>
//                 {item.href ? (
//                   <Link
//                     href={item.href}
//                     className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group hover:bg-gray-700
//                       ${
//                         activeItem === item.label
//                           ? "bg-gray-700 text-white"
//                           : "text-gray-400 hover:text-white"
//                       }`}
//                     onClick={() => setActiveItem(item.label)}
//                   >
//                     <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
//                     <span className="ml-3 font-medium">{item.label}</span>
//                     <FaAngleRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//                   </Link>
//                 ) : (
//                   <div className="flex items-center px-4 py-3 text-gray-400 cursor-not-allowed">
//                     <Icon className="w-5 h-5" />
//                     <span className="ml-3 font-medium">{item.label}</span>
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* <div className="absolute bottom-0 w-full p-6 bg-gray-800 bg-opacity-50">
//         <div className="text-center text-sm text-gray-500">
//           <p>Admin Dashboard v1.0</p>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default Navbar;

// Navbar.jsx
import React, { useState } from 'react';
import { FaList, FaQuestionCircle, FaSignOutAlt, FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('');
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'GET',
        credentials: 'include', // Important for cookie handling
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear any client-side auth state if you have any
        // For example, if you're using localStorage:
        localStorage.removeItem('user');

        // Redirect to login page
        router.push('/admin/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const navItems = [
    { icon: FaList, label: 'Category', href: '/admin/category' },
    { icon: FaQuestionCircle, label: 'Question', href: '/admin/question' },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      {/* ... rest of your existing code ... */}
<div className="p-6">
  <Link
    href="/admin/home"
    className="block text-2xl font-bold text-white text-center hover:text-indigo-400 transition-colors duration-200"
  >
    <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
      Admin Panel
    </span>
  </Link>
</div>

      <nav className=" px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group hover:bg-gray-700
                  ${activeItem === item.label ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveItem(item.label)}
              >
                <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                <span className="ml-3 font-medium">{item.label}</span>
                <FaAngleRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            </li>
          ))}

          {/* Separate logout button */}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 group hover:bg-gray-700 text-gray-400 hover:text-white"
            >
              <FaSignOutAlt className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              <span className="ml-3 font-medium">Logout</span>
              <FaAngleRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
