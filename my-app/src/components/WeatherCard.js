import React from 'react';

const WeatherCard = ({ data }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card weather-card">
        <div className="card-body">
          <h5 className="card-title">{data.name}, {data.sys.country}</h5>
          <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Weather Icon" />
          <p className="card-text">Weather: {data.weather[0].description}</p>
          <p className="card-text">Temperature: {data.main.temp}°C</p>
          <p className="card-text">Min/Max: {data.main.temp_min}°C / {data.main.temp_max}°C</p>
          <p className="card-text">Wind Speed: {data.wind.speed} m/s</p>
          <p className="card-text">Humidity: {data.main.humidity}%</p>
          <p className="card-text">Pressure: {data.main.pressure} hPa</p>
          <p className="card-text">Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p className="card-text">Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
