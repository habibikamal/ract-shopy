"use client";

import { useState } from "react";
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);

  const languages = ["English", "Germany", "France", "Spain"];

  const selectLanguage = (lang: string) => {
    console.log("Language changed to:", lang);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Button */}
      <button
        className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1 rounded"
        onClick={() => setOpen(!open)}
      >
        <GlobeAltIcon className="h-6 w-6 text-gray-600" />
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang}
              className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded"
              onClick={() => selectLanguage(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
