import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const HomePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige-100 p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-brown-800 mb-8">
        Should I read it?
      </h1>
      <form onSubmit={handleSearch} className="w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Book name, Author, anything here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-full border-2 border-brown-300 focus:outline-none focus:border-brown-500 text-lg"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brown-500 text-white p-2 rounded-full hover:bg-brown-600 transition-colors"
          >
            <Search size={24} />
          </button>
        </div>
      </form>
      <p className="mt-8 text-brown-600 text-center max-w-lg">
        Discover book summaries and decide if they're worth your time. Enter a book title, author, or topic to get started.
      </p>
    </div>
  );
};

export default HomePage;