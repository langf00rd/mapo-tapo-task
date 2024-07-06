"use client";

import { Search, Star } from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { saveQueryInSearchHistory } from "./lib/utils";
import { Product } from "./lib/types";
import ProductCard from "@/components/product-card";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();
    setProducts(data.data.products);
    saveQueryInSearchHistory(query);
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          "/api/products?priceMin=20&priceMax=800&rating=4.5",
        );
        const data = await res.json();
        setProducts(data.data.products);
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className="flex items-center w-screen bg-white border-b z-10 sticky top-0 px-5 md:px-44 py-6 justify-between">
        <b className="text-xl flex-1">Acme Store</b>
        <form
          onSubmit={handleSearch}
          className="w-[300px] md:w-[400px] flex items-center gap-2"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search"
            className="border p-2 rounded-full px-5 w-full max-w-[500px]"
          />
          <button className="bg-gray-100 p-2 text-gray-500 rounded-full">
            <Search />
          </button>
        </form>
      </div>
      <p className="md:ml-[265px] mt-5">
        {isLoading
          ? "Fetching products..."
          : `Showing ${products.length} products`}
      </p>
      <ul className="grid px-5 md:grid-cols-3 mt-5 gap-10 max-w-[1200px] mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
