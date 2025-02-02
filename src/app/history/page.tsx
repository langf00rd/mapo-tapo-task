"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchHistory, setSearchHistory] = useState<string[] | null>(null);

  function handleClearSearchHistory() {
    const confirmClear = confirm("Are you sure you want to clear search history?");
    if (confirmClear) {
      localStorage.removeItem("search_history");
      setSearchHistory(null);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const searchHistory = localStorage.getItem("search_history");
    if (searchHistory) setSearchHistory(JSON.parse(searchHistory));
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return (
    <div>
      <header className="bg-white border-b z-10 sticky top-0 px-5 py-6">
        <div className="flex items-center max-w-[1300px] mx-auto bg-white px-5 justify-between">
          <b className="md:text-xl">
            <Link href="/">Acme Store</Link>
          </b>
          <b className="text-xl">Search history</b>
          {searchHistory && searchHistory.length > 0 && (
            <button
              className="flex gap-2 text-red-400 bg-gray-100 p-2 px-3 rounded-full"
              onClick={handleClearSearchHistory}
            >
              Clear history
              <X />
            </button>
          )}
        </div>
      </header>

      {!searchHistory && (
        <div className="flex items-center justify-center h-[300px]">
          <div className="flex flex-col items-center gap-4">
            <b className="text-xl">No search history</b>
          </div>
        </div>
      )}
      <ul className="max-w-[1200px] mx-auto">
        {searchHistory?.map((search, index) => (
          <li key={index} className="flex items-center gap-4 p-4 border-b">
            <div className="flex items-center gap-4">
              <Search />
              <b>{search}</b>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
