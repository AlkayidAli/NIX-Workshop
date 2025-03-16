import "./weather.scss";
import { loadComponent } from "../utils/loadComponents";
import headerHtml from "../components/common/header/header.html";
import footerHtml from "../components/common/footer/footer.html";
import "../components/common/header/header.scss";
import "../components/common/footer/footer.scss";
import "../components/common/header/header.js";
// img import
import searchIcon from "../images/icons/search.png";
import locationIcon from "../images/icons/location.png";

// make sure to remove this after apllying the api
import weatherStatusIcon from "../images/icons/rain-icon-placeholder.png";
//*************************

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", headerHtml);
  loadComponent("footer", footerHtml);
});

const tempUnitToggle = document.getElementById("tempUnitToggle");
const speedUnitToggle = document.getElementById("speedUnitToggle");

tempUnitToggle.addEventListener("change", (e) => {
  const isCelsius = e.target.checked;
  // Use this boolean to convert temperatures
  console.log("Temperature unit:", isCelsius ? "Celsius" : "Fahrenheit");
});

speedUnitToggle.addEventListener("change", (e) => {
  const isMetric = e.target.checked;
  // Use this boolean to convert speeds
  console.log("Speed unit:", isMetric ? "km/h" : "mph");
});

document.querySelectorAll(".toggle-slider").forEach((slider) => {
  slider.innerHTML = `
    <span>${slider.dataset.left}</span>
    <span>${slider.dataset.right}</span>
  `;
});
