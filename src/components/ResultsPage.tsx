import React, {  useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, CoffeeIcon, ExternalLink, SubtitlesIcon } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  const [bookData] = useState(JSON.parse(query).volumeInfo || '')
  const [headline] = useState(JSON.parse(query).searchInfo.textSnippet || '')

  console.log(JSON.parse(query))

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-beige-100 to-brown-100">
    <div className="flex-grow container mx-auto p-4 md:p-8">
      <Link to="/" className="inline-flex items-center text-brown-600 hover:text-brown-800 mb-6 transition-colors duration-200">
        <ArrowLeft size={24} className="mr-2" />
        <span className="text-lg font-semibold">Back to Search</span>
      </Link>
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 relative">
            <img className="h-96 w-full object-cover md:w-80" src={bookData?.imageLinks?.thumbnail} alt={bookData.title} />
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-brown-900 mb-2">{bookData?.title}</h1>
              <p className="text-xl text-brown-600 mb-4"> -- by {bookData?.authors?.map(a => a).join(', ')}</p>
             {bookData?.subtitle && (<div className="flex items-center mb-4">
                <SubtitlesIcon className='mr-2' />
                <span className="text-brown-700">{bookData?.subtitle}</span>
              </div>)}
              <div className="flex bottom-0 left-0 right-0">
                <div className="flex text-sm font-semibold">
                  <Calendar className='mr-2' /> {bookData?.publishedDate}
                </div>
              </div>
              <div className="flex items-center mt-8">
                <span className="text-sm text-brown-800">{headline}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-brown-900 mb-4">Summary</h2>
          <p className="text-lg text-brown-700 leading-relaxed">{bookData?.description}</p>
        </div>
        <div className="p-8 border-t border-gray-200 bg-gradient-to-b from-white to-beige-100">
          <a
            href={`https://www.google.com/books/edition/_/${JSON.parse(query).id}?hl=en}`}
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

    <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <p className="text-center text-sm">
        &copy; 2024 JSON Formatter. All rights reserved.
      </p>
      <p className="text-center text-sm">
      <button
          onClick={() => window.open('https://buymeacoffee.com/pallavjha', '_blank')}
          className={`
            inline-flex items-center px-4 py-2 text-sm 
            bg-transparent focus:ring-4 focus:ring-yellow-300
            transition-all duration-200 ease-in-out transform hover:scale-105
          `}
        >
          <CoffeeIcon style={{ marginRight: '12px'}} />
          Buy Me a Coffee
        </button>
      </p>

    </div>
    </footer>
    </div>
  );
};

export default ResultsPage;