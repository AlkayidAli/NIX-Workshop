import "../styles/global.scss";
import "../components/common/header/header.scss";
import "../components/common/footer/footer.scss";
import "./index.scss";
import { loadComponent } from "../utils/loadComponents";
import headerHtml from "../components/common/header/header.html";
import footerHtml from "../components/common/footer/footer.html";
import "../components/common/header/header.js"; // Add this line

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", headerHtml);
  loadComponent("footer", footerHtml);
});
