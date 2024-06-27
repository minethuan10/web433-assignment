// components/CityDetail.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchWeatherByCityId } from '../lib/weatherAPI';
import { Container, Card } from 'react-bootstrap';

const CityDetail = ({ onViewCity }) => {
  const router = useRouter();
  const { id } = router.query;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (id) {
        try {
          const data = await fetchWeatherByCityId(id);
          setWeather(data);
          onViewCity(id); // Update visited cities
        } catch (error) {
          console.error('Error fetching weather:', error);
        }
      }
    };
    fetchWeather();
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
