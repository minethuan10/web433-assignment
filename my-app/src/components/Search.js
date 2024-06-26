// components/Search.js
import React, { useState } from 'react';
import WeatherList from './WeatherList';
import Pagination from './Pagination';
import { fetchWeatherByQuery } from './weatherAPI';

const Search = ({ onViewCity }) => {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const handleSearch = () => {
    if (query.trim()) {
      const trimmedQuery = query.trim().replace(/\s+/g, ' ').toLowerCase();
      fetchWeatherByQuery(trimmedQuery)
        .then(data => {
          if (data.length > 0) {
            setWeatherData(data);
            setError('');
            setCurrentPage(0);
          } else {
            setError('No results found.');
            setWeatherData([]);
          }
        })
        .catch(() => setError('Error fetching weather data.'));
    } else {
      setError('Please enter a valid city name or city,country_code.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < weatherData.length) setCurrentPage(currentPage + 1);
  };

  const paginatedData = weatherData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Search Weather</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-control"
            placeholder="Enter city name or city_name,country_code"
          />
          <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      </div>
      <WeatherList weatherData={paginatedData} />
      <Pagination
        currentPage={currentPage}
        totalItems={weatherData.length}
        itemsPerPage={itemsPerPage}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default Search;
