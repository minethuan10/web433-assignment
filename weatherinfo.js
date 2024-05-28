/*
Name: Vu Duc Thuan Tran
Student id:121804223
My live server is:https://minethuan10.github.io/web433-assignment/
*/
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchBtn').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value.trim();
        if (query) {
            searchWeather(query);
        } else {
            document.getElementById('error').textContent = 'Please enter a valid city name.';
        }
    });

    document.getElementById('searchInput').addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('searchBtn').click();
        }
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            displayWeatherData(currentData, currentPage);
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if ((currentPage + 1) * itemsPerPage < currentData.length) {
            currentPage++;
            displayWeatherData(currentData, currentPage);
        }
    });
});


const itemsPerPage = 3;
let currentPage = 0;
let currentData = [];

const searchWeather = (query) => {
    fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&units=metric&appid=29d80837e8d1e5fe92b9b8064c260ae3&cnt=6`)
        .then(response => response.json())
        .then(data => {
            if (data.count > 0) {
                currentData = data.list;
                currentPage = 0;
                displayWeatherData(currentData, currentPage);
                document.getElementById('error').textContent = '';
            } else {
                document.getElementById('error').textContent = 'No results found.';
                document.getElementById('weatherInfo').innerHTML = '';
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
};

const displayWeatherData = (data, page) => {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '';

    const start = page * itemsPerPage;
    const end = Math.min(start + itemsPerPage, data.length);
    const paginatedData = data.slice(start, end);

    paginatedData.forEach(city => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
        <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${city.name}, ${city.sys.country}</h5>
          <img src="http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png" alt="Weather Icon">
          <p class="card-text">Weather: ${city.weather[0].description}</p>
          <p class="card-text">Temperature: ${city.main.temp}°C</p>
          <p class="card-text">Min/Max: ${city.main.temp_min}°C / ${city.main.temp_max}°C</p>
          <p class="card-text">Wind Speed: ${city.wind.speed} m/s</p>
          <p class="card-text">Humidity: ${city.main.humidity}%</p>
          <p class="card-text">Pressure: ${city.main.pressure} hPa</p>
          <p class="card-text">Sunrise: ${new Date(city.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p class="card-text">Sunset: ${new Date(city.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      </div>
        `;
        weatherInfo.appendChild(card);
    });

    document.getElementById('prevBtn').disabled = (page === 0);
    document.getElementById('nextBtn').disabled = (end >= data.length);
};
