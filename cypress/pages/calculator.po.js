import { calculatorPageText } from '../constant/calculator';
export class CalculatorPagePo {
  mainContainer = new MainContainer();
  calculator = new Calculator();

  calculatorCard = '[data-testid="calculator-card"]';

  navigateToTheCalculatorPage() {
    cy.visit('/');
    cy.get(this.calculatorCard).find('a').click();
    cy.url().should('include', '/calculator');
  }
}

export class MainContainer {
  title = 'h1';

  verifyTitle() {
    cy.get(this.title).should('have.text', calculatorPageText.title).and('be.visible');
  }
}

export class Calculator {
  calculator = '#calculator';
  currentValue = '#calculationInput';
  previousValue = '#calculationState';
  history = '#history';
  historyContent = '#history-content';

  calculatorIsDisplayed() {
    cy.get(this.calculator).should('be.visible');
  }

  verifyScoreboard(previousOperation = false) {
    cy.get(this.currentValue).should('be.visible').and('have.value', '');

    if (previousOperation) {
      cy.get(this.previousValue).should('be.visible').and('have.value', '');
    }
  }

  verifyCalculatorButtons() {
    const buttons = ['AC', '+/-', '%', '×', '÷', '-', '+', '=', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    cy.get(this.calculator)
      .find('button')
      .each(($button) => {
        cy.get($button)
          .invoke('text')
          .then((buttonText) => {
            expect(buttons).to.include(buttonText);
          });
      });
  }

  verifyOperationAdd(historyCheck = false) {
    // 10.001 + 5.01 = 15.011
    cy.get(this.calculator).contains('1').click();
    cy.get(this.calculator).contains('0').click();
    cy.get(this.calculator).contains('.').click();
    cy.get(this.calculator).contains('0').click();
    cy.get(this.calculator).contains('0').click();
    cy.get(this.calculator).contains('1').click();

    cy.get(this.calculator).find('button').filter(':contains("+"):not(:contains("+/-"))').click();

    if (historyCheck) {
      cy.get(this.previousValue).should('have.value', '10.001 +');
    }

    cy.get(this.calculator).contains('5').click();
    cy.get(this.calculator).contains('.').click();
    cy.get(this.calculator).contains('0').click();

    cy.get(this.currentValue).should('have.value', '5.0');

    cy.get(this.calculator).contains('1').click();

    cy.get(this.currentValue).should('have.value', '5.01');

    cy.get(this.calculator).contains('=').click();

    cy.get(this.currentValue).should('have.value', '15.011');

    if (historyCheck) {
      cy.get(this.previousValue).should('have.value', '');
    }

    cy.get(this.calculator).contains('AC').click();

    cy.get(this.currentValue).should('have.value', '');

    if (historyCheck) {
      cy.get(this.previousValue).should('have.value', '');
    }

    // 0.1 + 0.2 = 0.3
    cy.get(this.calculator).contains('0').click();
    cy.get(this.calculator).contains('.').click();
    cy.get(this.calculator).contains('1').click();

    cy.get(this.calculator).find('button').filter(':contains("+"):not(:contains("+/-"))').click();

    cy.get(this.calculator).contains('0').click();
    cy.get(this.calculator).contains('.').click();
    cy.get(this.calculator).contains('2').click();

    cy.get(this.calculator).contains('=').click();

    cy.get(this.currentValue).should('have.value', '0.3');

    cy.get(this.calculator).contains('AC').click();
  }

  verifyOperationSubtract(historyCheck = false) {
    // 9 - 5 = 4
    cy.get(this.calculator).contains('9').click();

    cy.get(this.calculator).find('button').filter(':contains("-"):not(:contains("+/-"))').click();

    if (historyCheck) {
      cy.get(this.previousValue).should('have.value', '9 -');
    }

    cy.get(this.calculator).contains('5').click();

    cy.get(this.calculator).contains('=').click();

    cy.get(this.currentValue).should('have.value', '4');

    cy.get(this.calculator).contains('AC').click();

    // 0 - 5 = -5
    cy.get(this.calculator).contains('0').click();

    cy.get(this.calculator).find('button').filter(':contains("-"):not(:contains("+/-"))').click();

    if (historyCheck) {
      cy.get(this.previousValue).should('have.value', '0 -');
    }

    cy.get(this.calculator).contains('5').click();

    cy.get(this.calculator).contains('=').click();

    cy.get(this.currentValue).should('have.value', '-5');

    cy.get(this.calculator).contains('AC').click();
  }

  verifyOperationMultiply(historyCheck = false) {
    // 8 * 4 = 32
    cy.get(this.calculator).contains('8').click();

    cy.get(this.calculator).find('button').contains('×').click();

    if (historyCheck) {
      cy.get(this.previousValue).should('have.value', '8 ×');
    }

    cy.get(this.calculator).contains('4').click();

    cy.get(this.calculator).contains('=').click();

    cy.get(this.currentValue).should('have.value', '32');

    cy.get(this.calculator).contains('AC').click();

    // 8.8 * 2.2 = 19.36
    cy.get(this.calculator).contains('8').click();
    cy.get(this.calculator).contains('.').click();
    cy.get(this.calculator).contains('8').click();

    cy.get(this.calculator).find('button').contains('×').click();

    cy.get(this.calculator).contains('2').click();
    cy.get(this.calculator).contains('.').click();
    cy.get(this.calculator).contains('2').click();

    cy.get(this.calculator).contains('=').click();

    cy.get(this.currentValue).should('have.value', '19.36');

    cy.get(this.calculator).contains('AC').click();
  }

  verifyOperationDivide(historyCheck = false) {
    // 6 / 3 = 2
    cy.get(this.calculator).contains('6').click();

    cy.get(this.calculator).contains('÷').click();

    if (historyCheck) {
      cy.get(this.previousValue).should('have.value', '6 ÷');
    }

    cy.get(this.calculator).contains('3').click();

    cy.get(this.calculator).contains('=').click();

    cy.get(this.currentValue).should('have.value', '2');

    cy.get(this.calculator).contains('AC').click();

    // 7 / 4 = 1.75
    cy.get(this.calculator).contains('7').click();

    cy.get(this.calculator).contains('÷').click();

    cy.get(this.calculator).contains('4').click();

    cy.get(this.calculator).contains('=').click();

    cy.get(this.currentValue).should('have.value', '1.75');

    cy.get(this.calculator).contains('AC').click();

    // 666 / 0 = Infinity ???
    cy.get(this.calculator).contains('6').click();
    cy.get(this.calculator).contains('6').click();
    cy.get(this.calculator).contains('6').click();

    cy.get(this.calculator).contains('÷').click();

    cy.get(this.calculator).contains('0').click();

    cy.get(this.calculator).contains('=').click();

    cy.get(this.currentValue).should('have.value', 'Infinity');

    cy.get(this.calculator).contains('0').click();
    cy.get(this.currentValue).should('have.value', '0');

    cy.get(this.calculator).contains('AC').click();

    // 10 / 3 = 3.3333333333333
    cy.get(this.calculator).contains('1').click();
    cy.get(this.calculator).contains('0').click();

    cy.get(this.calculator).contains('÷').click();

    cy.get(this.calculator).contains('3').click();

    cy.get(this.calculator).contains('=').click();

    cy.get(this.currentValue).should('have.value', '3.3333333333333');

    cy.get(this.calculator).contains('AC').click();
  }

  verifyOperationPercent(historyCheck = false) {
    // 10 % 3 = 0.3
    cy.get(this.calculator).contains('1').click();
    cy.get(this.calculator).contains('0').click();

    cy.get(this.calculator).find('button').contains('%').click();

    if (historyCheck) {
      cy.get(this.previousValue).should('have.value', '10 %');
    }

    cy.get(this.calculator).contains('3').click();

    cy.get(this.calculator).contains('=').click();

    cy.get(this.currentValue).should('have.value', '0.3');

    cy.get(this.calculator).contains('AC').click();
  }

  verifyOperationChangeSign(historyCheck = false) {
    // 11 + 3 +/- = 8
    cy.get(this.calculator).contains('1').click();
    cy.get(this.calculator).contains('1').click();

    cy.get(this.calculator).find('button').filter(':contains("+"):not(:contains("+/-"))').click();

    if (historyCheck) {
      cy.get(this.previousValue).should('have.value', '11 +');
    }

    cy.get(this.calculator).contains('3').click();

    cy.get(this.calculator).find('button').contains('+/-').click();

    cy.get(this.calculator).contains('=').click();

    cy.get(this.currentValue).should('have.value', '8');

    cy.get(this.calculator).contains('AC').click();

    // 7 +/- + 3 +/- = -10
    cy.get(this.calculator).contains('7').click();

    cy.get(this.calculator).find('button').contains('+/-').click();

    cy.get(this.calculator).find('button').filter(':contains("+"):not(:contains("+/-"))').click();

    if (historyCheck) {
      cy.get(this.previousValue).should('have.value', '-7 +');
    }

    cy.get(this.calculator).contains('3').click();

    cy.get(this.calculator).find('button').contains('+/-').click();

    cy.get(this.calculator).contains('=').click();

    cy.get(this.currentValue).should('have.value', '-10');

    cy.get(this.calculator).contains('AC').click();
  }

  verifyHistoryBtn() {
    cy.get(this.history).find('button').should('have.text', calculatorPageText.historyBtn).and('be.visible');
  }

  clickOnTheHistoryBtn() {
    cy.get(this.history).find('button').click();
  }

  verifyInitialContent() {
    cy.get(this.history).should('have.class', 'active').and('be.visible');
    cy.get(this.historyContent).should('have.prop', 'textContent', '');
  }

  verifyOpenHistory() {
    this.verifyOperationPercent(true);

    cy.get(this.historyContent)
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const trimmedText = text.replace(/\s+/g, '');
        expect(trimmedText).to.equal('10%3=0.3');
      });
  }

  verifyCloseHistory() {
    this.verifyOperationChangeSign(true);

    this.clickOnTheHistoryBtn();

    cy.get(this.historyContent)
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const trimmedText = text.replace(/\s+/g, '');
        expect(trimmedText).to.equal('10%3=0.311+-3=8-7+-3=-10');
      });
  }
}
