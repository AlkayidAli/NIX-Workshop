import { notesPageText, filterButtons } from '../constant/notes';

export class NotesPagePo {
  mainContainer = new MainContainer();
  noteForm = new NoteForm();
  notesCard = new NotesCard();

  stickyPadCard = '[data-testid="sticky-pad-card"]';

  navigateToTheNotesPage() {
    cy.visit('/');
    cy.get(this.stickyPadCard).find('a').click();
    cy.url().should('include', '/notes');
  }
}

export class MainContainer {
  title = 'h1';
  button = '#addNoteBtn';
  allFilterBtn = '#allFilterBtn';
  activeFilterBtn = '#activeFilterBtn';
  completedFilterBtn = '#completedFilterBtn';

  verifyTitle() {
    cy.get(this.title).should('have.text', notesPageText.title).and('be.visible');
  }

  verifyAddButton() {
    cy.get(this.button).should('have.text', notesPageText.addButton).and('be.visible');
  }

  clickOnTheAddButton() {
    cy.get(this.button).click();
  }

  verifyAllNotesBtn() {
    cy.get(this.allFilterBtn).should('be.visible').and('contain.text', filterButtons.all).and('have.class', 'active');
  }

  verifyAllNotesBtnWithCounter(num) {
    cy.get(this.allFilterBtn).should('be.visible').click().and('contain.text', filterButtons.all).and('have.class', 'active');

    cy.get(this.activeFilterBtn).should('not.have.class', 'active');
    cy.get(this.completedFilterBtn).should('not.have.class', 'active');

    cy.get(this.allFilterBtn).should('contain.text', num);
  }

  verifyActiveNotesBtn() {
    cy.get(this.activeFilterBtn).should('be.visible').and('contain.text', filterButtons.active).and('not.have.class', 'active');
  }

  verifyActiveNotesBtnWithCounter(num) {
    cy.get(this.activeFilterBtn).should('be.visible').click().and('contain.text', filterButtons.active).and('have.class', 'active');

    cy.get(this.allFilterBtn).should('not.have.class', 'active');
    cy.get(this.completedFilterBtn).should('not.have.class', 'active');

    cy.get(this.activeFilterBtn).should('contain.text', num);
  }

  verifyCompletedNotesBtn() {
    cy.get(this.completedFilterBtn).should('be.visible').and('contain.text', filterButtons.completed).and('not.have.class', 'active');
  }

  verifyCompletedNotesBtnWithCounter(num) {
    cy.get(this.completedFilterBtn).should('be.visible').click().and('contain.text', filterButtons.completed).and('have.class', 'active');

    cy.get(this.allFilterBtn).should('not.have.class', 'active');
    cy.get(this.activeFilterBtn).should('not.have.class', 'active');

    cy.get(this.completedFilterBtn).should('contain.text', num);
  }

  clickOnTheAllNotesFilterBtn() {
    cy.get(this.allFilterBtn).click().and('have.class', 'active');
    cy.get(this.activeFilterBtn).should('not.have.class', 'active');
    cy.get(this.completedFilterBtn).should('not.have.class', 'active');
  }

  clickOnTheActiveFilterBtn() {
    cy.get(this.activeFilterBtn).click().and('have.class', 'active');
    cy.get(this.allFilterBtn).should('not.have.class', 'active');
    cy.get(this.completedFilterBtn).should('not.have.class', 'active');
  }

  clickOnTheCompletedFilterBtn() {
    cy.get(this.completedFilterBtn).click().and('have.class', 'active');
    cy.get(this.allFilterBtn).should('not.have.class', 'active');
    cy.get(this.activeFilterBtn).should('not.have.class', 'active');
  }
}

export class NoteForm {
  form = '#noteForm';
  formInputTitle = '#modalTitle';
  formInputDescription = '#modalText';
  formCancelBtn = '#cancelForm';
  formSaveBtn = '#saveForm';

  formIsDisplayed() {
    cy.get(this.form).should('be.visible');
  }

  verifyFormTitle(title) {
    cy.get(this.form).find('label').should('contains.text', title);
  }

  verifyTitleInputField() {
    cy.get(this.formInputTitle).should('be.visible').and('have.prop', 'tagName', 'INPUT').and('have.attr', 'name', 'title');
  }

  verifyFormDescription(description) {
    cy.get(this.form).find('label').should('contains.text', description);
  }

  verifyDescriptionInputField() {
    cy.get(this.formInputDescription).should('be.visible').and('have.prop', 'tagName', 'TEXTAREA').and('have.attr', 'name', 'description');
  }

  verifyCancelButton(text) {
    cy.get(this.formCancelBtn).should('have.text', text).and('be.visible');
  }

  clickOnTheCancelButton() {
    cy.get(this.formCancelBtn).click();
    cy.get(this.form).should('not.be.visible');
  }

  verifySaveButton(text) {
    cy.get(this.formSaveBtn).should('have.text', text).and('be.visible');
  }

  clickOnTheSaveButton() {
    cy.get(this.formSaveBtn).click();
    cy.get(this.form).should('not.be.visible');
  }

  fillTitle(text) {
    cy.get(this.formInputTitle).clear().type(text);
  }

  fillDescription(text) {
    cy.get(this.formInputDescription).clear().type(text);
  }

  verifyTitleInputText(text) {
    cy.get(this.formInputTitle).should('have.value', text);
  }

  verifyDescriptionInputText(text) {
    cy.get(this.formInputDescription).should('have.value', text);
  }
}

export class NotesCard {
  noteCard = '#noteList';
  editBtn = '[data-testid="edit"]';
  statusBtn = '[data-testid="status"]';
  removeBtn = '[data-testid="remove"]';

  verifyEmptyNote() {
    cy.get(this.noteCard).find('>').first().should('be.visible').find(':is(h2, h3, h4, h5, h6)').should('have.text', '');
    cy.get(this.noteCard).find('>').first().find('p').should('have.text', '');
  }

  verifyNoteWithTitle(title) {
    cy.get(this.noteCard).find('>').eq(1).should('be.visible').find(':is(h2, h3, h4, h5, h6)').should('have.text', title);
    cy.get(this.noteCard).find('>').eq(1).find('p').should('have.text', '');
  }

  verifyNoteWithDescription(description) {
    cy.get(this.noteCard).find('>').eq(2).should('be.visible').find(':is(h2, h3, h4, h5, h6)').should('have.text', '');
    cy.get(this.noteCard).find('>').eq(2).find('p').should('have.text', description);
  }

  verifyNoteWithBoth(title, description) {
    cy.get(this.noteCard).find('>').last().should('be.visible').find(':is(h2, h3, h4, h5, h6)').should('have.text', title);
    cy.get(this.noteCard).find('>').last().find('p').should('have.text', description);
  }

  verifyNumberOfCards(num) {
    cy.get(this.noteCard).find('>').filter(':visible').should('have.length', num);
  }

  verifyNoteCardButtons() {
    cy.get(this.noteCard)
      .find('>')
      .each(($btn) => {
        cy.get($btn).find(this.editBtn).should('be.visible').and('have.prop', 'tagName', 'BUTTON');
        cy.get($btn).find(this.statusBtn).should('be.visible').and('have.prop', 'tagName', 'BUTTON');
        cy.get($btn).find(this.removeBtn).should('be.visible').and('have.prop', 'tagName', 'BUTTON');
      });
  }

  clickOnTheEditBtn(num) {
    cy.get(this.noteCard).find('>').eq(num).find(this.editBtn).click();
  }

  clickOnTheStatusBtn(num) {
    cy.get(this.noteCard).find('>').eq(num).find(this.statusBtn).click();
  }

  verifyCompletedNoteCardStatus(num) {
    cy.get(this.noteCard).find('>').eq(num).should('have.class', 'completed');
  }

  verifyNoteCardStatus(num) {
    cy.get(this.noteCard).find('>').eq(num).should('not.have.class', 'completed');
  }

  clickOnTheRemoveBtn(num) {
    cy.get(this.noteCard).find('>').eq(num).find(this.removeBtn).click();
  }
}
