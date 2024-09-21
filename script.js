const apiKey = '9c2d140872b57ab73dee77a586b420ca'; 
const getWeatherBtn = document.getElementById('getWeatherBtn');

getWeatherBtn.addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            document.getElementById('weatherResult').innerText = error.message;
        });
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const weatherCondition = weather[0].main.toLowerCase(); // Get the main weather condition
    const weatherInfo = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Condition: ${weather[0].description}</p>
    `;
    document.getElementById('weatherResult').innerHTML = weatherInfo;

    // Change the background based on the weather condition
    changeBackground(weatherCondition);
}

function changeBackground(condition) {
    const body = document.body;

    // Set background based on weather condition
    if (condition.includes('clear')) {
        body.style.backgroundImage = "url('clear-sky.jpg')";
    } else if (condition.includes('clouds')) {
        body.style.backgroundImage = "url('cloudy-sky.jpg')";
    } else if (condition.includes('rain')) {
        body.style.backgroundImage = "url('rainy-sky.jpg')";
    } else if (condition.includes('snow')) {
        body.style.backgroundImage = "url('snowy-sky.jpg')";
    } else {
        body.style.backgroundImage = "url('default-sky.jpg')";
    }
    body.style.backgroundSize = "cover"; // Cover the whole page
    body.style.transition = "background-image 0.5s ease"; // Smooth transition
}

