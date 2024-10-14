import { weatherPageText } from '../constant/weather';

export class WeatherPagePo {
  header = new Header();
  search = new Search();
  weatherDetails = new WeatherDetails();
  weatherDetailsAdvance = new WeatherDetailsAdvance();

  weatherCard = '[data-testid="weather-card"]';

  navigateToTheWeatherPage() {
    cy.visit('/');
    cy.get(this.weatherCard).find('a').click();
    cy.url().should('include', '/weather');
  }
}

export class Header {
  title = 'h1';

  verifyTitle() {
    cy.get(this.title).should('have.text', weatherPageText.title).and('be.visible');
  }
}

export class Search {
  search = '[data-testid="search"]';
  searchError = '#searchError';

  verifySearch() {
    cy.get(this.search).should('be.visible');
    cy.get(this.search).find('input').should('have.attr', 'type', 'search').and('have.attr', 'placeholder', weatherPageText.searchPlaceholder);
  }

  typeLocation(city) {
    cy.get(this.search).find('input').clear().type(`${city}{enter}`);
  }

  verifyErrorMessage() {
    cy.get(this.searchError).should('be.visible').and('have.text', weatherPageText.errorMessage);
  }

  verifyErrorMessageNotDisplayed() {
    cy.get(this.searchError).should('not.be.visible');
  }
}

export class WeatherDetails {
  location = '#location';
  weekday = '#weekday';
  weatherDetails = '#weatherDetails';
  weatherForecast = '#weatherForecast';

  verifyLocation(city) {
    cy.get(this.location).should('have.prop', 'tagName', 'P').and('have.prop', 'textContent', city).and('be.visible');
  }

  verifyWeekday() {
    const day = Cypress.dayjs().format('dddd, D MMMM, YYYY');

    cy.get(this.weekday).should('have.prop', 'textContent', day).and('be.visible');
  }

  verifyMainWeatherDetails(city, days = 7, num, far = false, speed = false) {
    const fieldNames = ['Humidity', 'Wind', 'Chance of snow', 'Chance of rain'];
    const valuesFromRequest = [];
    const temperature = [];

    const invokedFieldsName = [];
    const invokedValues = [];

    const apiUrl = Cypress.config('weatherApiUrl');
    const url = `${apiUrl}&q=${city}&days=${days}`;

    cy.request(url)
      .then((response) => {
        const humidity = response.body.forecast.forecastday[num].day.avghumidity;
        const chanceOfSnow = response.body.forecast.forecastday[num].day.daily_chance_of_snow;
        const chanceOfRain = response.body.forecast.forecastday[num].day.daily_chance_of_rain;
        let windSpeed;
        let temp;

        if (speed) {
          windSpeed = response.body.forecast.forecastday[num].day.maxwind_mph;
        } else {
          windSpeed = response.body.forecast.forecastday[num].day.maxwind_kph;
        }

        if (far) {
          temp = response.body.forecast.forecastday[num].day.avgtemp_f;
        } else {
          temp = response.body.forecast.forecastday[num].day.avgtemp_c;
        }

        temp = Math.round(temp).toString();

        let speedValue;
        if (speed) {
          speedValue = 'm/h';
        } else {
          speedValue = 'km/h';
        }
        const valuesArray = [`${humidity}${'%'}`, `${windSpeed} ${speedValue}`, `${chanceOfSnow}${'%'}`, `${chanceOfRain}${'%'}`];

        if (temp > 0) {
          temp = `+${temp}`;
        }

        valuesFromRequest.push(...valuesArray);
        temperature.push(temp);
      })
      .then(() => {
        cy.get(this.weatherDetails).should('be.visible');
        cy.get(this.weatherDetails).find('img').should('be.visible').and('have.attr', 'src');

        let tempValue;
        if (far) {
          tempValue = weatherPageText.toggleFahr;
        } else {
          tempValue = weatherPageText.toggleCel;
        }

        cy.get(this.weatherDetails).find('[data-testid="degree"]').should('be.visible').and('have.prop', 'textContent', `${temperature} ${tempValue}`);

        cy.get(this.weatherDetails)
          .find('[data-testid="details-list"] >')
          .each(($field) => {
            cy.get($field)
              .invoke('text')
              .then((fieldText) => {
                const [firstPart, secondPart] = fieldText.split(':');
                invokedFieldsName.push(firstPart.trim());
                invokedValues.push(secondPart.trim());
              });
          });

        cy.wrap(fieldNames).should('deep.equal', invokedFieldsName);
        cy.wrap(valuesFromRequest).should('deep.equal', invokedValues);
      });
  }

  verifyForecastForCity(city, days = 7, far = false) {
    const temperature = [];
    const dayList = [];
    for (let i = 0; i < days; i++) {
      const weekday = Cypress.dayjs().add(i, 'day').format('dddd');
      dayList.push(weekday);
    }

    const invokedDayList = [];
    const invokedTemperature = [];

    const apiUrl = Cypress.config('weatherApiUrl');
    const url = `${apiUrl}&q=${city}&days=${days}`;

    cy.request(url)
      .then((response) => {
        response.body.forecast.forecastday.forEach((day) => {
          let avgTemp;

          if (far) {
            avgTemp = day.day.avgtemp_f;
          } else {
            avgTemp = day.day.avgtemp_c;
          }

          avgTemp = Math.round(avgTemp).toString();

          if (avgTemp > 0) {
            avgTemp = `+${avgTemp}`;
          }

          if (far) {
            avgTemp += ` ${weatherPageText.toggleFahr}`;
          } else {
            avgTemp += ` ${weatherPageText.toggleCel}`;
          }

          temperature.push(avgTemp);
        });
      })
      .then(() => {
        cy.get(this.weatherForecast).find('>').first().should('have.class', 'active');
        cy.get(this.weatherForecast)
          .find('>')
          .each(($day) => {
            cy.get($day)
              .find(':is(h2, h3, h4, h5, h6)')
              .invoke('text')
              .then((weekday) => {
                invokedDayList.push(weekday.trim());
              });

            cy.get($day).find('img').should('be.visible');

            cy.get($day)
              .find('p')
              .invoke('text')
              .then((temp) => {
                invokedTemperature.push(temp);
              });
          });

        cy.wrap(dayList).should('deep.equal', invokedDayList);
        cy.wrap(temperature).should('deep.equal', invokedTemperature);
      });
  }

  clickOnTheForecastDay(num) {
    cy.get(this.weatherForecast).find('>').eq(num).click().should('have.class', 'active');
  }
}

export class WeatherDetailsAdvance {
  daySwitcher = '#daysSwitch';
  sevenDays = '#sevenDays';
  fourteenDays = '#fourteenDays';
  toggleCel = '#toggleCel';
  toggleFahr = '#toggleFahr';
  toggleKm = '#toggleKm';
  toggleMil = '#toggleMil';

  verifyDaySwitcher() {
    cy.get(this.daySwitcher).should('be.visible');
  }

  clickOnTheSevenDays() {
    cy.get(this.sevenDays).should('be.visible').and('have.text', weatherPageText.sevenDays).click();
  }

  clickOnTheFourteenDays() {
    cy.get(this.fourteenDays).should('be.visible').and('have.text', weatherPageText.fourteenDays).click();
  }

  clickOnTheToggleCel() {
    cy.get(this.toggleCel).should('have.attr', 'name', 'toggleDegree').and('have.attr', 'type', 'radio').check({ force: true });
    cy.get(this.toggleCel).should('have.prop', 'checked', true);
    cy.get(this.toggleFahr).should('have.prop', 'checked', false);
  }
  clickOnTheToggleFahr() {
    cy.get(this.toggleFahr).should('have.attr', 'name', 'toggleDegree').and('have.attr', 'type', 'radio').check({ force: true });
    cy.get(this.toggleFahr).should('have.prop', 'checked', true);
    cy.get(this.toggleCel).should('have.prop', 'checked', false);
  }
  clickOnTheToggleKmpH() {
    cy.get(this.toggleKm).should('have.attr', 'name', 'toggleSpeed').and('have.attr', 'type', 'radio').check({ force: true });
    cy.get(this.toggleKm).should('have.prop', 'checked', true);
    cy.get(this.toggleMil).should('have.prop', 'checked', false);
  }
  clickOnTheToggleMpH() {
    cy.get(this.toggleMil).should('have.attr', 'name', 'toggleSpeed').and('have.attr', 'type', 'radio').check({ force: true });
    cy.get(this.toggleMil).should('have.prop', 'checked', true);
    cy.get(this.toggleKm).should('have.prop', 'checked', false);
  }
}
