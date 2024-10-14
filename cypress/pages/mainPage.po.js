import { mainPageText } from '../constant/mainPage';

export class MainPagePo {
  mainContainer = new MainContainer();
  stickyPadCard = new StickyPadCard();
  calculatorCard = new CalculatorCard();
  weatherCard = new WeatherCard();

  navigateToTheMainPage() {
    cy.visit('/');
  }
}

export class MainContainer {
  title = 'h1';
  bunner = '[data-testid="banner"]';
  stickyPadCard = '[data-testid="sticky-pad-card"]';
  calculatorCard = '[data-testid="calculator-card"]';
  weatherCard = '[data-testid="weather-card"]';

  verifyTitle() {
    cy.get(this.title).should('contain.text', mainPageText.titleWhite).and('be.visible');
    cy.get(this.title).should('contain.text', mainPageText.titleBlue).and('be.visible');
    cy.get(this.title).should('contain.text', mainPageText.titleRed).and('be.visible');
  }

  verifyBunner() {
    cy.get(this.bunner).should('be.visible');
    cy.get(this.bunner).should('have.attr', 'src');
    cy.get(this.bunner).should('have.attr', 'alt');
  }

  verifyCards() {
    cy.get(this.stickyPadCard).should('exist');
    cy.get(this.calculatorCard).should('exist');
    cy.get(this.weatherCard).should('exist');
  }
}

export class StickyPadCard {
  stickyPadCard = '[data-testid="sticky-pad-card"]';

  verifyStickyPadCardTitle(title) {
    cy.get(this.stickyPadCard).find(':is(h2, h3, h4, h5, h6)').should('have.text', title).and('be.visible');
  }

  verifyStickyPadCardSubtitle(subtitle) {
    cy.get(this.stickyPadCard)
      .find('p')
      .should('be.visible')
      .invoke('text')
      .then((cardText) => {
        const text = cardText.replace(/\s+/g, ' ').trim();
        expect(text).to.equal(subtitle);
      });
  }

  verifyStickyPadCardIcon() {
    cy.get(this.stickyPadCard).find('img').should('be.visible');
    cy.get(this.stickyPadCard).find('img').should('have.attr', 'src');
    cy.get(this.stickyPadCard).find('img').should('have.attr', 'alt');
  }

  verifyStickyPadCardButton() {
    cy.get(this.stickyPadCard).find('a').should('have.attr', 'href', '/notes');
    cy.get(this.stickyPadCard).find('a').click();
    cy.url().should('include', '/notes');
  }
}
export class CalculatorCard {
  calculatorCard = '[data-testid="calculator-card"]';

  verifyCalculatorCardTitle(title) {
    cy.get(this.calculatorCard).find(':is(h2, h3, h4, h5, h6)').should('have.text', title).and('be.visible');
  }

  verifyCalculatorCardSubtitle(subtitle) {
    cy.get(this.calculatorCard)
      .find('p')
      .should('be.visible')
      .invoke('text')
      .then((cardText) => {
        const text = cardText.replace(/\s+/g, ' ').trim();
        expect(text).to.equal(subtitle);
      });
  }

  verifyCalculatorCardIcon() {
    cy.get(this.calculatorCard).find('img').should('be.visible');
    cy.get(this.calculatorCard).find('img').should('have.attr', 'src');
    cy.get(this.calculatorCard).find('img').should('have.attr', 'alt');
  }

  verifyCalculatorCardButton() {
    cy.get(this.calculatorCard).find('a').should('have.attr', 'href', '/calculator');
    cy.get(this.calculatorCard).find('a').click();
    cy.url().should('include', '/calculator');
  }
}

export class WeatherCard {
  weatherCard = '[data-testid="weather-card"]';

  verifyWeatherCardTitle(title) {
    cy.get(this.weatherCard).find(':is(h1, h2, h3, h4, h5, h6)').should('have.text', title).and('be.visible');
  }

  verifyWeatherCardSubtitle(subtitle) {
    cy.get(this.weatherCard)
      .find('p')
      .should('be.visible')
      .invoke('text')
      .then((cardText) => {
        const text = cardText.replace(/\s+/g, ' ').trim();
        expect(text).to.equal(subtitle);
      });
  }

  verifyWeatherCardIcon() {
    cy.get(this.weatherCard).find('img').should('be.visible');
    cy.get(this.weatherCard).find('img').should('have.attr', 'src');
    cy.get(this.weatherCard).find('img').should('have.attr', 'alt');
  }

  verifyWeatherCardButton() {
    cy.get(this.weatherCard).find('a').should('have.attr', 'href', '/weather');
    cy.get(this.weatherCard).find('a').click();
    cy.url().should('include', '/weather');
  }
}
