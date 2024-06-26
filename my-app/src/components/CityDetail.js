// components/CityDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWeatherByCityId } from '../components/weatherAPI';
import { Container, Card } from 'react-bootstrap';

const CityDetail = ({ onViewCity }) => {
  const { id } = useParams();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeatherByCityId(id)
      .then(data => {
        setWeather(data);
        onViewCity(id); // Update visited cities
      })
      .catch(error => console.error('Error fetching weather:', error));
  }, [id, onViewCity]);

  if (!weather) return <p>Loading...</p>;

  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Header>{weather.name}, {weather.sys.country}</Card.Header>
        <Card.Body>
          <Card.Title>{weather.weather[0].main}</Card.Title>
          <Card.Text>
            Temperature: {weather.main.temp}°C
            <br />
            Min/Max: {weather.main.temp_min}°C / {weather.main.temp_max}°C
            <br />
            Wind Speed: {weather.wind.speed} m/s
            <br />
            Humidity: {weather.main.humidity}%
            <br />
            Pressure: {weather.main.pressure} hPa
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
          <br />
          Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default CityDetail;
