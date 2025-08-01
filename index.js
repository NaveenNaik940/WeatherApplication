

// Function to fetch weather data
function getWeather() {
    const apiKey='92bc8fe0338dccbb6446c3b1819c74c4';
    const city=document.getElementById('city').value;
    
    const weatherurl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecasturl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(weatherurl)
    .then(response=>response.json())
    .then(data=>{displayweather(data);})
    .catch(error=>{
        console.error('Error fetching current weather data:',error);
        alert('Error fetching current weather data. Please try again.');
    });
    fetch(forecasturl)
    .then(response=>response.json())
    .then(data=>{
        displayHourlyForecast(data.list);
    })
    .catch(error=>{
        console.error('Error fetching hourly forecast data:',error);
        alert('Error fetching hourly forecast data.Please try again.');
    });


}
function displayweather(data)
{
    const tempdivInfo=document.getElementById('temp-div');
    const weatherInfo=document.getElementById('weather-info');
    const weatherIcon=document.getElementById('weather-icon');
    const hourlyForecast=document.getElementById('hourly-forecast');
    weatherInfo.innerHTML='';
    hourlyForecast.innerHTML='';
    tempdivInfo.innerHTML='';
    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        console.log(iconCode);
        console.log("hinaveen");
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempdivInfo.innerHTML = temperatureHTML;
        weatherInfo.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}

