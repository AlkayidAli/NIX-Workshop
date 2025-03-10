import "./calculator.scss";
import { loadComponent } from "../utils/loadComponents";
import headerHtml from "../components/common/header/header.html";
import footerHtml from "../components/common/footer/footer.html";
import "../components/common/header/header.scss";
import "../components/common/footer/footer.scss";
import "../components/common/header/header.js";
import arrowIcon from "../images/icons/d-arrow.png";

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", headerHtml);
  loadComponent("footer", footerHtml);

  // Set arrow image src
  const historyToggle = document.getElementById("history-toggle");
  historyToggle.addEventListener("click", () => {
    document.querySelector(".history-container").classList.toggle("active");
  });
});
