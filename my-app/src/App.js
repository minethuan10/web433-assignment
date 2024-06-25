import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchBar';
import WeatherList from './components/WeatherList';
import Pagination from './components/Pagination';
import { fetchWeatherByCoordinates, fetchWeatherByQuery } from './components/weatherAPI';

const App = () => {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    // Fetch local weather on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude)
            .then(data => setWeatherData([data]))
            .catch(() => setError('Error fetching local weather data.'));
        },
        () => setError('Location access denied.')
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      fetchWeatherByQuery(query)
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

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < weatherData.length) setCurrentPage(currentPage + 1);
  };

  const paginatedData = weatherData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Weather Search</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} error={error} />
      <WeatherList weatherData={paginatedData} />
      <Pagination currentPage={currentPage} totalItems={weatherData.length} itemsPerPage={itemsPerPage} onPrev={handlePrev} onNext={handleNext} />
    </div>
  );
};

export default App;
