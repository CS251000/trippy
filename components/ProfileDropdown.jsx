'use client';

import { UserButton } from '@clerk/nextjs';
import { useState } from 'react';

export default function ProfileDropdown() {
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const toggleCustomDropdown = () => {
    setIsCustomOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* UserProfileButton (default dropdown will appear automatically) */}
      <UserButton />

      {/* Custom Dropdown Toggle */}
      <button
        onClick={toggleCustomDropdown}
        className="mt-2 p-2 border rounded-md bg-gray-900 hover:bg-gray-200"
      >
        Open Custom Dropdown
      </button>

      {/* Custom Dropdown */}
      {isCustomOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-200 rounded-md shadow-lg">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="/dashboard">Dashboard</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="/settings">Settings</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
