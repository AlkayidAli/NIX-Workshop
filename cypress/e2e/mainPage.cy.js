import { HeaderPo } from '../pages/header.po';
import { FooterPo } from '../pages/footer.po';
import { MainPagePo } from '../pages/mainPage.po';
import { headerLinks, cardsText, footerLinks, footerText } from '../constant/mainPage';

const header = new HeaderPo();
const mainPage = new MainPagePo();
const footer = new FooterPo();

before(() => {
  mainPage.navigateToTheMainPage();
});

describe('Main page basic', () => {
  it('Verify header', () => {
    header.verifyHeaderLogo();
    header.verifyHeaderLinks(headerLinks.tasksLink);
    header.verifyHeaderLinks(headerLinks.aboutLink);
    header.verifyHeaderLinks(headerLinks.supportLink);
    header.verifyHeaderLinks(headerLinks.contactUs);
  });

  it('Verify main section', () => {
    if (Cypress.config('viewportWidth') > 833) {
      mainPage.mainContainer.verifyTitle();
      mainPage.mainContainer.verifyBunner();
    } else {
      mainPage.mainContainer.verifyTitle();
    }
  });

  it('Verify cards section', () => {
    mainPage.mainContainer.verifyCards();
  });

  it('Verify "Sticky pad" card', () => {
    mainPage.stickyPadCard.verifyStickyPadCardTitle(cardsText.stickyPadTitle);
    mainPage.stickyPadCard.verifyStickyPadCardSubtitle(cardsText.stickyPadSubtitle);
    mainPage.stickyPadCard.verifyStickyPadCardIcon();
    mainPage.stickyPadCard.verifyStickyPadCardButton();
    mainPage.navigateToTheMainPage();
  });

  it('Verify "Calculator" card', () => {
    mainPage.calculatorCard.verifyCalculatorCardTitle(cardsText.calculatorTitle);
    mainPage.calculatorCard.verifyCalculatorCardSubtitle(cardsText.calculatorSubtitle);
    mainPage.calculatorCard.verifyCalculatorCardIcon();
    mainPage.calculatorCard.verifyCalculatorCardButton();
    mainPage.navigateToTheMainPage();
  });

  it('Verify "Weather" card', () => {
    mainPage.weatherCard.verifyWeatherCardTitle(cardsText.weatherTitle);
    mainPage.weatherCard.verifyWeatherCardSubtitle(cardsText.weatherSubtitle);
    mainPage.weatherCard.verifyWeatherCardIcon();
    mainPage.weatherCard.verifyWeatherCardButton();
    mainPage.navigateToTheMainPage();
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
});
