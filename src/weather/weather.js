import "./weather.scss";
import { loadComponent } from "../utils/loadComponents";
import headerHtml from "../components/common/header/header.html";
import footerHtml from "../components/common/footer/footer.html";
import "../components/common/header/header.scss";
import "../components/common/footer/footer.scss";
import "../components/common/header/header.js";
import searchIcon from "../images/icons/search.png";
import locationIcon from "../images/icons/location.png";

// global variables
let currentDays = 7;
let isCelsius = true;
let isMetric = true;

// API configuration
const weatherAPI = {
  apiKey: process.env.WEATHER_API_KEY,
  baseUrl: "https://api.weatherapi.com/v1",

  async getWeatherData(location, days = 7) {
    try {
      const response = await fetch(
        `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${location}&days=${days}&aqi=no&alerts=no`
      );
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // error message to user
      const errormsg = document.getElementById("errorMessage");
      const textfield = document.getElementById("search-bar");
      if (errormsg) {
        textfield.classList.add("error");
        errormsg.style.display = "block";
      }
      setTimeout(() => {
        textfield.classList.remove("error");
        errormsg.style.display = "none";
      }, 5000);
      throw error;
    }
  },
};

const tempUnitToggle = document.getElementById("tempUnitToggle");
const speedUnitToggle = document.getElementById("speedUnitToggle");

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", headerHtml);
  loadComponent("footer", footerHtml);
  initializeWeather();

  //toggle sliders
  document.querySelectorAll(".toggle-slider").forEach((slider) => {
    slider.innerHTML = `
      <span>${slider.dataset.left}</span>
      <span>${slider.dataset.right}</span>
    `;
  });

  // Unit toggle
  tempUnitToggle.addEventListener("change", async (e) => {
    isCelsius = !e.target.checked;
    const currentCity = document.getElementById("city-search").value.trim();
    await updateWeatherDisplay(currentCity, currentDays);
  });

  speedUnitToggle.addEventListener("change", async (e) => {
    isMetric = !e.target.checked;
    const currentCity = document.getElementById("city-search").value.trim();
    await updateWeatherDisplay(currentCity, currentDays);
  });
});

// Day format
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const dayName = date.toLocaleString("en-US", { weekday: "long" });

  return `${day} ${month} ${year}, ${dayName}`;
}

async function initializeWeather() {
  const defaultCity = "Budapest";
  const searchInput = document.getElementById("city-search");
  const daysSwitch = document.getElementById("daysSwitch");

  searchInput.value = defaultCity;
  await updateWeatherDisplay(defaultCity, currentDays);

  searchInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const city = searchInput.value.trim();
      if (city) {
        await updateWeatherDisplay(city, currentDays);
      }
    }
  });

  daysSwitch.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.id === "sevenDays") {
      currentDays = 7;
      e.target.classList.add("active");
      document.getElementById("tenDays").classList.remove("active");
    } else if (e.target.id === "tenDays") {
      currentDays = 10;
      e.target.classList.add("active");
      document.getElementById("sevenDays").classList.remove("active");
    }
    await updateWeatherDisplay(searchInput.value.trim(), currentDays);
  });
}

async function updateWeatherDisplay(city, days) {
  const today = new Date();
  try {
    const weatherData = await weatherAPI.getWeatherData(city, days);
    document.getElementById(
      "city-name"
    ).textContent = `${weatherData.location.name}, ${weatherData.location.country}`;

    document.getElementById("date-text").textContent = formatDate(today);

    const current = weatherData.current;
    const weatherStatusIcon = document.querySelector(".weather-status-icon");
    weatherStatusIcon.src = current.condition.icon;

    const temp = isCelsius ? current.temp_c : current.temp_f;
    const windSpeed = isMetric ? current.wind_kph : current.wind_mph;

    document.getElementById("temp").textContent = `${Math.round(temp)}${
      isCelsius ? "°C" : "°F"
    }`;
    document.getElementById("humidity").textContent = `${current.humidity}%`;
    document.getElementById(
      "pressure"
    ).textContent = `${current.pressure_mb} hPa`;
    document.getElementById("wind").textContent = `${windSpeed} ${
      isMetric ? "km/h" : "mph"
    }`;
    document.getElementById(
      "precipitation"
    ).textContent = `${current.precip_mm} mm`;

    updateForecast(weatherData.forecast.forecastday);
  } catch (error) {
    console.error("Error updating weather display:", error);
  }
}

function updateMainDisplay(dayData) {
  const weatherStatusIcon = document.querySelector(".weather-status-icon");
  weatherStatusIcon.src = dayData.day.condition.icon;

  const temp = isCelsius ? dayData.day.avgtemp_c : dayData.day.avgtemp_f;
  const windSpeed = isMetric
    ? dayData.day.maxwind_kph
    : dayData.day.maxwind_mph;

  document.getElementById("temp").textContent = `${Math.round(temp)}${
    isCelsius ? "°C" : "°F"
  }`;
  document.getElementById(
    "humidity"
  ).textContent = `${dayData.day.avghumidity}%`;
  document.getElementById("wind").textContent = `${windSpeed} ${
    isMetric ? "km/h" : "mph"
  }`;
  document.getElementById(
    "precipitation"
  ).textContent = `${dayData.day.totalprecip_mm} mm`;
}

function updateForecast(forecastData) {
  const forecastContainer = document.getElementById("weatherForecast");
  forecastContainer.innerHTML = "";

  forecastData.forEach((day, index) => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const temp = isCelsius ? day.day.avgtemp_c : day.day.avgtemp_f;

    const dayElement = document.createElement("div");
    dayElement.className = `weather-forcast-day${index === 0 ? " active" : ""}`;
    dayElement.innerHTML = `
      <p class="day">${dayName}</p>
      <img src="${
        day.day.condition.icon
      }" alt="weather-status-icon" class="weather-status-icon" />
      <p class="temp">${Math.round(temp)}${isCelsius ? "°C" : "°F"}</p>
    `;

    dayElement.addEventListener("click", () => {
      document.querySelectorAll(".weather-forcast-day").forEach((el) => {
        el.classList.remove("active");
      });
      dayElement.classList.add("active");
      updateMainDisplay(day);
    });

    forecastContainer.appendChild(dayElement);
  });
}
