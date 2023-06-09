const apiKey = '0343f8e94c9ee9e90480b90ce0f6d95b';
const searchButton = document.querySelector('.btn-search-city');
const cityNameElement = document.querySelector('.city-name');
const cityNameCountryElement = document.querySelector('.city-name-country');
const countryNameElement = document.querySelector('.country-name');
const currentTimeElement = document.querySelector('.current-time');
const weatherTempElement = document.querySelector('.weather-temp');
const weatherDescElement = document.querySelector('.weather-description');
const weatherWindElement = document.querySelector('.weather-wind');
const weatherHumidityElement = document.querySelector('.weather-humidity');
const weathervisibilityElement = document.querySelector('.weather-visibility');
const weatherPressureElement = document.querySelector('.weather-pressure');
const weatherImageElement = document.querySelector('.weather-img');


// *************** NEW DATA START

// Check if weather data exists in localStorage
const storedWeatherData = localStorage.getItem('weatherData');

if (storedWeatherData) {
  renderWeatherData(JSON.parse(storedWeatherData));
} else {
  // Weather data not found in localStorage
  alert('Please enter a city name to get weather information.');
}

searchButton.addEventListener('click', getWeatherData);

function getWeatherData() {
  const cityInput = document.querySelector('.search-city').value;

  if (!cityInput) {
    alert('Please enter a valid city name.');
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        alert('City not found. Please enter a valid city name.');
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      renderWeatherData(data);
      // Save weather data to localStorage
      localStorage.setItem('weatherData', JSON.stringify(data));
    })
    .catch(error => {
      console.error('Error:', error);
      alert('City not found. Please enter a valid city name.');
    });
}



// Render function updated *****************

function renderWeatherData(data) {
  const {
    main,
    wind,
    visibility,
    weather,
    name,
    sys,
    dt
  } = data;

  if (!main || !wind || !weather || !name || !sys || !dt) {
    console.error('Invalid weather data:', data);
    alert('Invalid weather data. Please try again.');
    return;
  }

  const {
    temp,
    humidity,
    pressure
  } = main;

  const {
    speed
  } = wind;

  const {
    description,
    icon
  } = weather[0];

  const {
    country,
    sunrise,
    sunset
  } = sys;

  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
  const currentTime = new Date(dt * 1000).toLocaleTimeString();

  // Fetch the complete name of the country
  const weatherIcon = weather[0].icon;
  const countryUrl = `https://restcountries.com/v3/alpha/${country}`;

  fetch(countryUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })
    .then(countryData => {
      const countryName = countryData[0].name.common;

      weatherImageElement.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
      weatherImageElement.style.width = '5rem';
      weatherImageElement.style.height = '100%';
      weatherTempElement.textContent = `${Math.round(temp)} °C`;
      cityNameElement.textContent = name;
      cityNameCountryElement.textContent = `${name},`;
      countryNameElement.textContent = countryName;
      currentTimeElement.textContent = currentTime;
      weatherDescElement.textContent = description;
      weatherWindElement.textContent = `${(speed * 3.6).toFixed(0)} Km/h`;
      weatherHumidityElement.textContent = `${humidity}%`;
      weathervisibilityElement.textContent = `${(visibility / 1000).toFixed(0)} Km`;
      weatherPressureElement.textContent = `${pressure} hPa`;
    })
    .catch(error => {
      console.error('Error:', error);
      alert('City not found. Please enter a valid city name.');
    });
}



// *************** NEW DATA END


let setBackground = ()=> {
    let element = document.querySelector("body");
    let currentTime = new Date();
    let sunriseTime = new Date(); // Set the sunrise time
    let sunsetTime = new Date(); // Set the sunset time
  
    // Example sunrise and sunset times (replace with actual values)
    sunriseTime.setHours(6, 0, 0); // 6:00 AM
    sunsetTime.setHours(18, 0, 0); // 6:00 PM
  
    // Get the current hour
    let currentHour = currentTime.getHours();
  
    // Compare the current hour with sunrise and sunset times
    if (currentHour >= sunriseTime.getHours() && currentHour < sunsetTime.getHours()) {
      element.style.backgroundImage = "url('../img/cloudy.jpg')";
    } else {
      element.style.backgroundImage = "url('../img/Cloudy-Night.jpg')";
    }
  }
  
  // Call the function when the page loads or as desired
  setBackground();
