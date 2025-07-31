const apiKey = 'f00c38e0279b7bc85480c3fe775d518c'; 
const url = 'https://api.openweathermap.org/data/2.5/weather';

$(document).ready(function () {
  weatherFn('Pune'); // Default city on load
});

async function weatherFn(cityName) {
  if (!cityName) {
    alert('Please enter a city name.');
    return;
  }

  const endpoint = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    if (res.ok) {
      updateWeather(data);
    } else {
      alert('❌ City not found. Try again.');
      $('#weather-info').fadeOut();
    }
  } catch (error) {
    console.error('Error fetching weather:', error);
    alert('Something went wrong. Please try later.');
  }
}

function updateWeather(data) {
  $('#city-name').text(data.name);
  $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
  $('#temperature').html(`${data.main.temp}°C`);
  $('#description').text(data.weather[0].description);
  $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
  $('#weather-icon').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
  $('#weather-info').fadeIn();
}
