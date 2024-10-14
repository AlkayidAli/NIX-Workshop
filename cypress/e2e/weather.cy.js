import { HeaderPo } from '../pages/header.po';
import { FooterPo } from '../pages/footer.po';
import { headerLinks, footerLinks, footerText } from '../constant/mainPage';
import { WeatherPagePo } from '../pages/weather.po';

const header = new HeaderPo();
const footer = new FooterPo();
const weatherPage = new WeatherPagePo();

before(() => {
  weatherPage.navigateToTheWeatherPage();
});

describe('Note page basic', () => {
  it('Verify header', () => {
    header.verifyHeaderLogo();
    header.verifyHeaderLinks(headerLinks.tasksLink);
    header.verifyHeaderLinks(headerLinks.aboutLink);
    header.verifyHeaderLinks(headerLinks.supportLink);
    header.verifyHeaderLinks(headerLinks.contactUs);
  });

  it('Verify footer', () => {
    footer.verifyFooterLogo();
    footer.verifyFooterLinks(footerLinks.tasksLink);
    footer.verifyFooterLinks(footerLinks.aboutLink);
    footer.verifyFooterLinks(footerLinks.termsLink);
    footer.verifyFooterLinks(footerLinks.privacyLink);
    footer.verifyFooterSocialsTitle(footerText.ourSocials);
    footer.verifyFooterSocialsIcons();
  });

  it('Verify title', () => {
    weatherPage.header.verifyTitle();
  });

  it('Verify search block', () => {
    weatherPage.search.verifySearch();
  });

  it('Verify default location', () => {
    weatherPage.weatherDetails.verifyLocation('Budapest, Hungary');
  });

  it('Verify weekday', () => {
    weatherPage.weatherDetails.verifyWeekday();
  });

  it('Verify weather details main block', () => {
    weatherPage.weatherDetails.verifyMainWeatherDetails('Budapest', 7, 0);
  });

  it('Verify forecast', () => {
    weatherPage.weatherDetails.verifyForecastForCity('Budapest');
  });

  it('Verify correct serch', () => {
    weatherPage.search.typeLocation('Kharkiv');
    weatherPage.search.verifyErrorMessageNotDisplayed();
    weatherPage.weatherDetails.verifyLocation('Kharkiv, Ukraine');

    weatherPage.weatherDetails.verifyMainWeatherDetails('Kharkiv', 7, 0);
    weatherPage.weatherDetails.verifyForecastForCity('Kharkiv');
  });

  it('Verify incorrect serch', () => {
    weatherPage.search.typeLocation('qwerty');
    weatherPage.search.verifyErrorMessage();
    weatherPage.weatherDetails.verifyLocation('Kharkiv, Ukraine');

    weatherPage.weatherDetails.verifyMainWeatherDetails('Kharkiv', 7, 0);
    weatherPage.weatherDetails.verifyForecastForCity('Kharkiv');
  });

  it('Verify forecast weather card and main block', () => {
    weatherPage.weatherDetails.clickOnTheForecastDay(3);
    weatherPage.weatherDetails.verifyMainWeatherDetails('Kharkiv', 7, 3);
  });
});
