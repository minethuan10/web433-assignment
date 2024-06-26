import React, { useEffect, useState } from 'react';
import WeatherList from './WeatherList';
import { fetchWeatherByCoords , fetchWeatherByCityId  } from './weatherAPI';

const Home = ({ onViewCity }) => {
  const [localWeather, setLocalWeather] = useState(null);
  const [error, setError] = useState('');
  const [visitedCities, setVisitedCities] = useState([]);

  // Function to fetch local weather based on geolocation
  const getLocalWeather = async (latitude, longitude) => {
    try {
      const data = await fetchWeatherByCoords(latitude, longitude);
      setLocalWeather(data);
      onViewCity(data.id);
    } catch (error) {
      setError('Error fetching local weather.');
    }
  };

  useEffect(() => {
    // Fetch local weather when component mounts
    const fetchLocalWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getLocalWeather(latitude, longitude);
          },
          () => setError('Location access denied.')
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    fetchLocalWeather();
  }, [onViewCity]);

  const handleCityClick = async (cityId) => {
    try {
      // Fetch weather data for the clicked city (replace with your API call)
      const data = await fetchWeatherByCityId(cityId);
      setVisitedCities([...visitedCities, data]); // Add city to visited cities list
      onViewCity(cityId);
    } catch (error) {
      setError('Error fetching city weather.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Weather Search</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      {localWeather && <WeatherList weatherData={[localWeather, ...visitedCities]} />}
      <div className="mt-3">
        <h3>Previously Viewed Cities:</h3>
        <ul>
          {visitedCities.map((city) => (
            <li key={city.id}>
              <button
                className="btn btn-link"
                onClick={() => handleCityClick(city.id)}
              >
                {city.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
