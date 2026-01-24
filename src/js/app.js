const API_KEY = "ae331bd76f901600655e60a876af5eab";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");


const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const extra = document.getElementById("extra");
const forecastContainer = document.getElementById("forecast");


const locCityName = document.getElementById("locCityName");
const locTemperature = document.getElementById("locTemperature");
const locDescription = document.getElementById("locDescription");
const locExtra = document.getElementById("locExtra");


async function getWeatherByCity(city) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        if (data.cod === 200) {
            displayWeather(data);
            getForecast(data.coord.lat, data.coord.lon);
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
    }
}

async function getForecast(lat, lon) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        displayForecast(data);
    } catch (err) {
        console.error(err);
    }
}

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)} °C`;
    description.textContent = data.weather[0].description;
    extra.textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} km/h`;
}

function displayForecast(data) {
    forecastContainer.innerHTML = "";
    const dailyData = data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
    );
    dailyData.forEach((day) => {
        const div = document.createElement("div");
        div.classList.add("forecast-day");
        div.innerHTML = `
            <h4>${new Date(day.dt_txt).toLocaleDateString()}</h4>
            <p>${Math.round(day.main.temp)} °C</p>
            <p>${day.weather[0].main}</p>
        `;
        forecastContainer.appendChild(div);
    });
}


searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) getWeatherByCity(city);
});


function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            try {
                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
                );
                const data = await res.json();
                displayLocationWeather(data);
            } catch (err) {
                console.error(err);
            }
        }, (error) => {
            console.warn("Geolocation failed or denied. Please search manually.");
        });
    } else {
        console.warn("Geolocation is not supported by this browser.");
    }
}

function displayLocationWeather(data) {
    locCityName.textContent = `${data.name}, ${data.sys.country}`;
    locTemperature.textContent = `${Math.round(data.main.temp)} °C`;
    locDescription.textContent = data.weather[0].description;
    locExtra.textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} km/h`;
}


window.addEventListener("load", getCurrentLocationWeather);
