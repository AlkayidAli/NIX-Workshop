//Imports
import "./calculator.scss";
import { loadComponent } from "../utils/loadComponents";
import headerHtml from "../components/common/header/header.html";
import footerHtml from "../components/common/footer/footer.html";
import "../components/common/header/header.scss";
import "../components/common/footer/footer.scss";
import "../components/common/header/header.js";
import "../images/icons/d-arrow.png";

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", headerHtml);
  loadComponent("footer", footerHtml);

  // main calculator object
  const calculator = {
    display: document.getElementById("calculationInput"),
    firstNumber: "",
    secondNumber: "",
    operator: "",
    isNewNumber: false,

    // start calculator
    init() {
      this.setupEventListeners();
      this.setupHistoryToggle();
    },

    setupEventListeners() {
      const buttons = document.querySelectorAll(".number-button");
      buttons.forEach((button) => {
        button.addEventListener("click", () =>
          this.handleButtonClick(button.textContent)
        );
      });
    },

    setupHistoryToggle() {
      const toggle = document.getElementById("history-toggle");
      toggle.addEventListener("click", () => {
        document.querySelector(".history-container").classList.toggle("active");
      });
    },

    handleButtonClick(value) {
      if (this.isNumber(value)) {
        this.handleNumber(value);
      } else {
        this.handleSymbol(value);
      }
    },

    isNumber(value) {
      return !isNaN(value) || value === ",";
    },

    handleNumber(num) {
      if (this.isNewNumber) {
        this.display.value = num;
        this.isNewNumber = false;
      } else {
        this.display.value += num;
      }
    },

    handleSymbol(symbol) {
      switch (symbol) {
        case "AC":
          this.clear();
          break;
        case "+/-":
          this.changeSign();
          break;
        case "=":
          this.calculate();
          break;
        default:
          this.handleOperator(symbol);
      }
    },

    clear() {
      this.display.value = "";
      this.firstNumber = "";
      this.secondNumber = "";
      this.operator = "";
      this.isNewNumber = false;
    },

    changeSign() {
      if (this.display.value) {
        this.display.value = (-parseFloat(this.display.value)).toString();
      }
    },

    handleOperator(op) {
      if (this.firstNumber && this.operator) {
        this.calculate();
      }
      this.firstNumber = this.display.value;
      this.operator = op;
      this.isNewNumber = true;
    },

    calculate() {
      if (!this.firstNumber || !this.operator || !this.display.value) return;

      this.secondNumber = this.display.value;
      const num1 = parseFloat(this.firstNumber);
      const num2 = parseFloat(this.secondNumber);
      let result;

      switch (this.operator) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "×":
          result = num1 * num2;
          break;
        case "÷":
          result = num2 !== 0 ? num1 / num2 : "Error";
          break;
        case "%":
          result = (num1 * num2) / 100;
          break;
      }

      this.updateHistory(num1, this.operator, num2, result);
      this.display.value = result;
      this.firstNumber = result;
      this.operator = "";
      this.isNewNumber = true;
    },

    updateHistory(num1, operator, num2, result) {
      const historyList = document.getElementById("history-list");
      const item = document.createElement("li");
      item.className = "history-element";

      const expression = document.createElement("span");
      expression.id = "expression";
      expression.textContent = `${num1} ${operator} ${num2} = `;

      const answer = document.createElement("span");
      answer.id = "term";
      answer.textContent = result;

      item.append(expression, answer);
      historyList.insertBefore(item, historyList.firstChild);
    },
  };

  calculator.init();
});
