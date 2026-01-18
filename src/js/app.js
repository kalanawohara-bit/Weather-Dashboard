const API_KEY = "ae331bd76f901600655e60a876af5eab";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const extra = document.getElementById("extra");
const forecastContainer = document.getElementById("forecast");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
        getForecast(city);
    }
});

async function getWeather(city) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)} °C`;
        description.textContent = data.weather[0].description;
        extra.textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} km/h`;
    } catch (error) {
        alert("City not found!");
    }
}

async function getForecast(city) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();

        forecastContainer.innerHTML = "";

        const dailyData = data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

        dailyData.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString();

            const card = document.createElement("div");
            card.classList.add("forecast-card");

            card.innerHTML = `
                <h4>${date}</h4>
                <p>${Math.round(day.main.temp)} °C</p>
                <p>${day.weather[0].main}</p>
            `;

            forecastContainer.appendChild(card);
        });
    } catch (error) {
        console.log(error);
    }
}
