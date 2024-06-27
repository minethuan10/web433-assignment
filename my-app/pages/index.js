// pages/index.js
import React, { useEffect, useState } from 'react';
import WeatherList from './components/WeatherList';
import { fetchWeatherByCoords, fetchWeatherByCityId } from './api/weatherAPI';

const Home = () => {
  const [localWeather, setLocalWeather] = useState(null);
  const [error, setError] = useState('');
  const [visitedCities, setVisitedCities] = useState([]);

  const onViewCity = (cityId) => {
    console.log(`Viewing city ID: ${cityId}`);
  };

  const getLocalWeather = async (latitude, longitude) => {
    try {
      const data = await fetchWeatherByCoords(latitude, longitude);
      setLocalWeather(data);
      onViewCity(data.id);
    } catch (error) {
      console.error('Error fetching local weather:', error);
      setError('Error fetching local weather.');
    }
  };

  useEffect(() => {
    const fetchLocalWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getLocalWeather(latitude, longitude);
          },
          (error) => {
            console.error('Geolocation error:', error);
            setError('Location access denied.');
          }
        );
      } else {
        console.error('Geolocation not supported');
        setError('Geolocation is not supported by this browser.');
      }
    };

    fetchLocalWeather();
  }, []);

  const handleCityClick = async (cityId) => {
    try {
      const data = await fetchWeatherByCityId(cityId);
      setVisitedCities([...visitedCities, data]); // Add city to visited cities list
      onViewCity(cityId);
    } catch (error) {
      console.error('Error fetching city weather:', error);
      setError('Error fetching city weather.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Weather Search</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      {localWeather ? (
        <WeatherList weatherData={[localWeather, ...visitedCities.filter(city => city !== null)]} />
      ) : (
        <p>Loading...</p>
      )}
      <div className="mt-3">
        <h3>Previously Viewed Cities:</h3>
        <ul>
          {visitedCities.map((city) => (
            city && (
              <li key={city.id}>
                <button
                  className="btn btn-link"
                  onClick={() => handleCityClick(city.id)}
                >
                  {city.name}
                </button>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
