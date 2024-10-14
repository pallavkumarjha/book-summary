import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { AutoComplete } from 'antd';
import { debounce } from 'lodash';
import axios from 'axios';

const SearchContainer = ({setSelectedBook}) => {
  const [options, setOptions] = useState([]);
  const [originalOptions, setOriginalOptions] = useState([]);

  const convertSearchString = (searchString: any) => {
      const encodedSeachString = encodeURI(searchString);
      return encodedSeachString;
  }

  const handleSearch = (e: any) => {
      debouncedGetResult(e);
  };

  const mutateOptions = (data: any) => {
      const mutatedOptions = data?.map(item => {
          return {
              value: `${item.volumeInfo.authors[0]} | ${item.volumeInfo.title}`,
              key: item.id,
              label: `${item.volumeInfo.authors[0]} | ${item.volumeInfo.title}`,
          }
      });
      setOptions(mutatedOptions);
  }

  const debouncedGetResult = debounce((searchTerm) => {
      if (searchTerm.trim() === '') {
          setOptions([]);
          return;
      }
  
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${convertSearchString(searchTerm)}&maxResults=5`)
          .then(response => {
              mutateOptions(response.data.items);
              setOriginalOptions(response.data.items);
          })
          .catch(error => {
              console.error(error);
          });
  }, 300);

  const onValueSelect = (value: any) => {
      const selectedOpt = originalOptions.find(option => `${option?.volumeInfo.authors[0]} | ${option.volumeInfo.title}` === value);
      setSelectedBook(selectedOpt);
  }

  return (
      <AutoComplete
          className='autocomplete-element'
          options={options}
          placeholder="Book name, Author, anything here"
          size='large'
          filterOption={(inputValue, option) =>
              option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onSearch={handleSearch}
          onSelect={onValueSelect}
          allowClear
          popupClassName='autocomplete-popup'
      />
  );
};

const HomePage: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState({});
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/results?q=${encodeURIComponent(JSON.stringify(selectedBook))}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige-100 p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-brown-800 mb-8">
        Should I read this?
      </h1>
      <form onSubmit={handleSearch} className="w-full max-w-md">
        <div className="relative">
          <SearchContainer setSelectedBook={setSelectedBook} />
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