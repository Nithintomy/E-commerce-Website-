import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Toaster } from 'react-hot-toast';
import { Product } from '../interfaces/Products';

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'lowToHigh' | 'highToLow'>('lowToHigh');

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'lowToHigh') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <>
       <div className="flex justify-center items-center mb-16 ">
        <div className="space-y-10">
          <div className="flex items-center rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200">
            <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input className="bg-gray-100 outline-none" type="text" placeholder="Product name..." onChange={e => setSearchQuery(e.target.value)} />
            </div>

            <div className="relative">
              <select
                className="py-3 px-4 rounded-lg border border-none text-gray-500 font-semibold cursor-pointer"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'lowToHigh' | 'highToLow')}
              >
                <option value="lowToHigh">Sort Low to High</option>
                <option value="highToLow">Sort High to Low</option>
              </select>
            
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {sortedProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </>
  );
}

export default ProductList;
