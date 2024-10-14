import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, BookOpen, Clock, Star, Tag } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  // Mock data for demonstration
  const bookData = {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    year: '1988',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    summary: 'An Andalusian shepherd boy named Santiago embarks on a journey to find a treasure near the Egyptian pyramids. Along the way, he encounters various characters who teach him valuable life lessons. The story is a metaphor for finding one\'s destiny and the importance of listening to one\'s heart.',
    aiInsights: [
      'The book emphasizes the importance of pursuing one\'s dreams and personal legend.',
      'It explores themes of spirituality, wisdom, and the interconnectedness of all things.',
      'The narrative encourages readers to trust in the journey of life and to be open to its lessons.',
    ],
    readTime: '4-6 hours',
    tags: ['Philosophy', 'Spirituality', 'Adventure', 'Self-Discovery'],
    rating: 4.5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-100 to-brown-100 p-4 md:p-8">
      <Link to="/" className="inline-flex items-center text-brown-600 hover:text-brown-800 mb-6 transition-colors duration-200">
        <ArrowLeft size={24} className="mr-2" />
        <span className="text-lg font-semibold">Back to Search</span>
      </Link>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 relative">
            <img className="h-96 w-full object-cover md:w-80" src={bookData.coverUrl} alt={bookData.title} />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="text-white text-sm font-semibold">{bookData.year}</div>
            </div>
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-brown-900 mb-2">{bookData.title}</h1>
              <p className="text-xl text-brown-600 mb-4">{bookData.author}</p>
              <div className="flex items-center mb-4">
                <Star className="text-yellow-500 mr-1" size={20} />
                <span className="text-lg font-semibold text-brown-800">{bookData.rating}/5</span>
              </div>
              <div className="flex items-center mb-4">
                <Clock size={20} className="text-brown-500 mr-2" />
                <span className="text-brown-700">{bookData.readTime}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-brown-800 mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {bookData.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gradient-to-r from-brown-200 to-brown-300 text-brown-800 rounded-full text-sm font-medium shadow-sm transition-transform hover:scale-105">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-brown-900 mb-4">Summary</h2>
          <p className="text-lg text-brown-700 leading-relaxed">{bookData.summary}</p>
        </div>
        <div className="p-8 bg-gradient-to-r from-brown-50 to-beige-100">
          <h2 className="text-3xl font-bold text-brown-900 mb-4">AI Insights</h2>
          <ul className="space-y-4">
            {bookData.aiInsights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <Tag className="text-brown-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <p className="text-brown-700 text-lg">{insight}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 border-t border-gray-200 bg-gradient-to-b from-white to-beige-100">
          <a
            href={`https://books.google.com/books?q=${encodeURIComponent(bookData.title + ' ' + bookData.author)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-white bg-gradient-to-r from-brown-600 to-brown-700 hover:from-brown-700 hover:to-brown-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Check on Google Books
            <ExternalLink size={24} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;