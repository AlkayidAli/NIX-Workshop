import "../styles/global.scss";
import "../components/common/header/header.scss";
import "../components/common/footer/footer.scss";
import "./index.scss";
import { loadComponent } from "../utils/loadComponents";
import headerHtml from "../components/common/header/header.html";
import footerHtml from "../components/common/footer/footer.html";
import "../components/common/header/header.js";
import stickyNotesIcon from "../images/icons/sticky-notes.png";
import calculatorIcon from "../images/icons/calculator.png";
import weatherIcon from "../images/icons/weather.png";
import cubeImage from "../images/display/cube.png";

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", headerHtml);
  loadComponent("footer", footerHtml);
  document.querySelector('[alt="sticky notes icon"]').src = stickyNotesIcon;
  document.querySelector('[alt="calculator icon"]').src = calculatorIcon;
  document.querySelector('[alt="weather icon"]').src = weatherIcon;
  document.querySelector('[alt="cube image"]').src = cubeImage;
});
