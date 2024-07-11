"use client";

import { Search } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { saveQueryInSearchHistory } from "./lib/utils";
import { Product } from "./lib/types";
import ProductCard from "@/components/product-card";
import Link from "next/link";

const SideBar = ({
  max,
  setMax,
  min,
  rating,
  setRating,
  ratingSymbol,
  setRatingSymbol,
  setMin,
  handlePriceFilter,
  handleRatingsFilter,
  loading,
}: {
  max: string;
  setMax: Dispatch<SetStateAction<string>>;
  rating: string;
  setRating: Dispatch<SetStateAction<string>>;
  ratingSymbol: string;
  setRatingSymbol: Dispatch<SetStateAction<string>>;
  min: string;
  setMin: Dispatch<SetStateAction<string>>;
  handlePriceFilter: (e: FormEvent) => void;
  handleRatingsFilter: (e: FormEvent) => void;
  loading: boolean;
}) => {
  return (
    <aside className="min-w-[320px] max-w-[320px] border-r pr-5">
      <div className="sticky top-[150px] space-y-10">
        <div className="bg-gray-100 rounded-md space-y-4  p-4">
          <h3 className="border-b pb-2">Price</h3>
          <form className="space-y-5" onSubmit={handlePriceFilter}>
            <div className="flex gap-2 items-center">
              <input
                placeholder="min"
                className="w-[45%] border p-2"
                value={min}
                type="number"
                onChange={(e) => setMin(e.target.value)}
              />
              <span>-</span>
              <input
                placeholder="max"
                type="number"
                className="w-[45%] border p-2"
                value={max}
                onChange={(e) => setMax(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 p-3 w-full flex items-center justify-center text-white rounded-lg"
              disabled={loading}
            >
              Filter Price
            </button>
          </form>
        </div>
        <form
          className="bg-gray-100 rounded-md p-4 space-y-4"
          onSubmit={handleRatingsFilter}
        >
          <h3 className="border-b pb-2">Ratings</h3>
          <div className="flex gap-2">
            <select
              className="w-full border p-2"
              value={ratingSymbol}
              onChange={(e) => setRatingSymbol(e.target.value)}
            >
              <option value=">">Greater than (&gt;):</option>
              <option value="<">Less than (&lt;):</option>
              <option value="=">Equal to (=):</option>
            </select>
            <select
              className="w-full border p-2"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-blue-500 p-3 w-full text-white rounded-lg"
            disabled={loading}
          >
            Filter Price
          </button>
        </form>
      </div>
    </aside>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("1");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [rating, setRating] = useState<string>("1");
  const [ratingSymbol, setRatingSymbol] = useState<string>(">");

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();
    setProducts(data.data.products);
    saveQueryInSearchHistory(query);
  }

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const minPriceQuery = minPrice ? `priceMin=${minPrice}` : "";
      const maxPriceQuery = maxPrice ? `priceMax=${maxPrice}` : "";
      const ratingQuery =
        ratingSymbol === "="
          ? `rating=${rating}`
          : rating
          ? `rating=${ratingSymbol + rating}`
          : "";
      const query = [minPriceQuery, maxPriceQuery, ratingQuery].filter(Boolean).join("&");
      const res = await fetch(`/api/products?${query}`);
      const data = await res.json();
      setProducts(data.data.products);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePriceFilter = (e: FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleRatingsFilter = (e: FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div>
      <header className="bg-white border-b z-10 sticky top-0 px-5 py-6">
        <div className="flex items-center max-w-[1300px] mx-auto bg-white px-5 justify-between">
          <b className="md:text-xl flex-1">Acme Store</b>
          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <div className="gap-2 flex items-center">
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
            </div>
            <Link href="/history" className="bg-blue-500 p-3 text-white rounded-lg">
              Search History
            </Link>
          </form>
        </div>
      </header>
      <p className="text-center mt-5">
        {isLoading ? "Fetching products..." : `Showing ${products.length} products`}
      </p>
      <main className="flex gap-4 max-w-[1300px] mx-auto p-5">
        <SideBar
          loading={isLoading}
          max={maxPrice}
          rating={rating}
          setRating={setRating}
          setMax={setMaxPrice}
          min={minPrice}
          setMin={setMinPrice}
          ratingSymbol={ratingSymbol}
          setRatingSymbol={setRatingSymbol}
          handlePriceFilter={handlePriceFilter}
          handleRatingsFilter={handleRatingsFilter}
        />
        <section>
          <ul className="grid px-5 md:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
