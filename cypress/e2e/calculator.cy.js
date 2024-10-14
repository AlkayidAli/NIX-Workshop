import { HeaderPo } from '../pages/header.po';
import { FooterPo } from '../pages/footer.po';
import { headerLinks, footerLinks, footerText } from '../constant/mainPage';
import { CalculatorPagePo } from '../pages/calculator.po';

const header = new HeaderPo();
const footer = new FooterPo();
const calculatorPage = new CalculatorPagePo();

before(() => {
  calculatorPage.navigateToTheCalculatorPage();
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

  it('Verify title and calculator', () => {
    calculatorPage.mainContainer.verifyTitle();
    calculatorPage.calculator.calculatorIsDisplayed();
  });

  it('Verify scoreboard', () => {
    calculatorPage.calculator.verifyScoreboard();
  });

  it('Verify calculator buttons', () => {
    calculatorPage.calculator.verifyCalculatorButtons();
  });

  it('Verify calculator operation of addition', () => {
    calculatorPage.calculator.verifyOperationAdd();
  });

  it('Verify calculator operation of subtraction', () => {
    calculatorPage.calculator.verifyOperationSubtract();
  });

  it('Verify calculator operation of multiplication', () => {
    calculatorPage.calculator.verifyOperationMultiply();
  });

  it('Verify calculator operation of divideon', () => {
    calculatorPage.calculator.verifyOperationDivide();
  });

  it('Verify calculator operation of percent', () => {
    calculatorPage.calculator.verifyOperationPercent();
  });

  it('Verify calculator operation of change of sign', () => {
    calculatorPage.calculator.verifyOperationChangeSign();
  });
});
