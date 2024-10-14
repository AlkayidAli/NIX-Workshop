import { HeaderPo } from '../pages/header.po';
import { FooterPo } from '../pages/footer.po';
import { headerLinks, footerLinks, footerText } from '../constant/mainPage';
import { NotesPagePo } from '../pages/notes.po';
import { notesFormText } from '../constant/notes';
import { MainPagePo } from '../pages/mainPage.po';

const notesPage = new NotesPagePo();
const header = new HeaderPo();
const footer = new FooterPo();
const mainPage = new MainPagePo();

before(() => {
  Cypress.session.clearAllSavedSessions();
  Cypress.session.clearCurrentSessionData();
  notesPage.navigateToTheNotesPage();
});

describe('Note page advanced', () => {
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
    notesPage.mainContainer.verifyTitle();
  });

  it('Verify ADD NOTE button', () => {
    notesPage.mainContainer.verifyAddButton();
  });

  it('Verify filter buttons with counter', () => {
    notesPage.mainContainer.verifyActiveNotesBtnWithCounter('0');
    notesPage.mainContainer.verifyCompletedNotesBtnWithCounter('0');
    notesPage.mainContainer.verifyAllNotesBtnWithCounter('0');
  });

  it('Verify note form', () => {
    notesPage.mainContainer.clickOnTheAddButton();
    notesPage.noteForm.formIsDisplayed();
    notesPage.noteForm.verifyFormTitle(notesFormText.title);
    notesPage.noteForm.verifyTitleInputField();
    notesPage.noteForm.verifyFormDescription(notesFormText.description);
    notesPage.noteForm.verifyDescriptionInputField();
    notesPage.noteForm.verifyCancelButton(notesFormText.cancelButton);
    notesPage.noteForm.verifySaveButton(notesFormText.saveButton);
  });

  it('Adding empty note', () => {
    notesPage.noteForm.clickOnTheSaveButton();
    notesPage.notesCard.verifyEmptyNote();
  });

  it('Adding note with title', () => {
    notesPage.mainContainer.clickOnTheAddButton();
    notesPage.noteForm.fillTitle('Test title');
    notesPage.noteForm.clickOnTheSaveButton();
    notesPage.notesCard.verifyNoteWithTitle('Test title');
  });

  it('Adding note with description', () => {
    notesPage.mainContainer.clickOnTheAddButton();
    notesPage.noteForm.fillDescription('Test description');
    notesPage.noteForm.clickOnTheSaveButton();
    notesPage.notesCard.verifyNoteWithDescription('Test description');
  });

  it('Adding note with title and description', () => {
    notesPage.mainContainer.clickOnTheAddButton();
    notesPage.noteForm.fillTitle('Test title2');
    notesPage.noteForm.fillDescription('Test description2');
    notesPage.noteForm.clickOnTheSaveButton();
    notesPage.notesCard.verifyNoteWithBoth('Test title2', 'Test description2');
  });

  it('Verify cancel button in form', () => {
    notesPage.mainContainer.clickOnTheAddButton();
    notesPage.noteForm.clickOnTheCancelButton();
    notesPage.notesCard.verifyNumberOfCards(4);
  });

  it('Verify note card buttons', () => {
    notesPage.mainContainer.clickOnTheAddButton();
    notesPage.noteForm.fillTitle('Test title3');
    notesPage.noteForm.fillDescription('Test description3');
    notesPage.noteForm.clickOnTheSaveButton();
    notesPage.notesCard.verifyNoteCardButtons();
  });

  it('Editing note card', () => {
    notesPage.notesCard.clickOnTheEditBtn(4);
    notesPage.noteForm.verifyTitleInputText('Test title3');
    notesPage.noteForm.verifyDescriptionInputText('Test description3');
    notesPage.noteForm.fillTitle('Test');
    notesPage.noteForm.fillDescription('Card');
    notesPage.noteForm.clickOnTheSaveButton();
    notesPage.notesCard.verifyNoteWithBoth('Test', 'Card');
  });

  it('Editing without saving note card', () => {
    notesPage.notesCard.clickOnTheEditBtn(4);
    notesPage.noteForm.fillTitle('123');
    notesPage.noteForm.fillDescription('456');
    notesPage.noteForm.clickOnTheCancelButton();
    notesPage.notesCard.verifyNoteWithBoth('Test', 'Card');
  });

  it('Change status note card', () => {
    notesPage.notesCard.verifyNoteCardStatus(4);
    notesPage.notesCard.clickOnTheStatusBtn(4);
    notesPage.notesCard.verifyCompletedNoteCardStatus(4);
    notesPage.notesCard.clickOnTheStatusBtn(4);
    notesPage.notesCard.verifyNoteCardStatus(4);
  });

  it('Remove note card', () => {
    notesPage.notesCard.clickOnTheRemoveBtn(4);
    notesPage.notesCard.verifyNumberOfCards(4);
  });

  it('Verify filter buttons', () => {
    notesPage.mainContainer.verifyAllNotesBtn();
    notesPage.mainContainer.verifyActiveNotesBtn();
    notesPage.mainContainer.verifyCompletedNotesBtn();
  });

  it('Verify filtering', () => {
    notesPage.notesCard.clickOnTheRemoveBtn(3);
    notesPage.notesCard.clickOnTheStatusBtn(2);
    notesPage.notesCard.clickOnTheStatusBtn(1);
    notesPage.mainContainer.clickOnTheActiveFilterBtn();
    notesPage.mainContainer.verifyActiveNotesBtnWithCounter('1');
    notesPage.notesCard.verifyNumberOfCards(1);
    notesPage.mainContainer.clickOnTheCompletedFilterBtn();
    notesPage.mainContainer.verifyCompletedNotesBtnWithCounter('2');
    notesPage.notesCard.verifyNumberOfCards(2);
    notesPage.mainContainer.verifyAllNotesBtnWithCounter('3');
    notesPage.notesCard.verifyNumberOfCards(3);
  });

  it('Saving note cards in local storage', () => {
    cy.reload();
    mainPage.navigateToTheMainPage();
    mainPage.stickyPadCard.verifyStickyPadCardButton();
    notesPage.notesCard.verifyNumberOfCards(3);
    notesPage.mainContainer.clickOnTheActiveFilterBtn();
    notesPage.notesCard.verifyNumberOfCards(1);
    notesPage.mainContainer.clickOnTheCompletedFilterBtn();
    notesPage.notesCard.verifyNumberOfCards(2);
  });
});
