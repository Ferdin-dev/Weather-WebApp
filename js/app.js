
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

searchButton.addEventListener('click', () => {
  const cityInput = document.querySelector('.search-city').value;
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
      const {
        main: { temp, humidity, pressure },
        wind: { speed },
        visibility,
        weather,
        name,
        sys: { country, sunrise, sunset },
        dt
      } = data;

      const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
      const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
      const currentTime = new Date(dt * 1000).toLocaleTimeString();

      const { description, icon } = weather[0];

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

        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const currentTime = new Date(data.dt * 1000).toLocaleTimeString();

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

    })
    .catch(error => {
      console.error('Error:', error);
      weatherInfo.innerHTML = 'An error occurred while fetching the weather data.';
      alert('City not found. Please enter a valid city name.');
    });
});


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
  