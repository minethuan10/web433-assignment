// components/CityWeather.js

import { useEffect, useState } from 'react';
import { fetchWeatherByCityId } from '../api/weatherAPI';
import { useAtom } from 'jotai';
import { visitedCitiesAtom } from '../atoms/jotai';

const CityWeather = ({ initialWeather, id }) => {
  const [weather, setWeather] = useState(initialWeather);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!initialWeather);
  const [, setVisitedCities] = useAtom(visitedCitiesAtom);

  useEffect(() => {
    if (!initialWeather) {
      fetchWeatherByCityId(id)
        .then(data => {
          setWeather(data);
          setLoading(false);
          setVisitedCities(prev => [...new Set([...prev, data.id])]); // Assuming data.id is the city ID
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id, initialWeather, setVisitedCities]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1>{weather.name}</h1>
      {weather.main && weather.main.temp !== undefined ? (
        <p>Temperature: {weather.main.temp}°C</p>
      ) : (
        <p>Temperature data is unavailable.</p>
      )}
      <p>Weather: {weather.weather && weather.weather[0].description}</p>
      <p>Wind Speed: {weather.wind && weather.wind.speed} m/s</p>
      {/* Add more weather details as needed */}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  let initialWeather = null;

  try {
    initialWeather = await fetchWeatherByCityId(id);
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Handle error fetching weather data, if needed
  }

  return {
    props: {
      initialWeather,
      id,
    },
  };
};

export default CityWeather;
