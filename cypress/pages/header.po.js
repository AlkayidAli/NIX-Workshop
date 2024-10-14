export class HeaderPo {
  headerIconDesk = 'header [data-testid="header-desktop"] img';
  headerLinksDesk = 'header [data-testid="header-desktop"] a';
  hamburgerMenu = '#menu-toggle';
  headerIconMob = 'header [data-testid="header-mobile"] img';
  headerLinksMob = 'header [data-testid="header-mobile"] a';

  verifyHeaderLogo() {
    if (Cypress.config('viewportWidth') > 833) {
      cy.get(this.headerIconDesk).should('be.visible');
      cy.get(this.headerIconDesk).should('have.attr', 'src');
      cy.get(this.headerIconDesk).should('have.attr', 'alt');
    } else {
      cy.get(this.hamburgerMenu).click({ force: true });
      cy.get(this.headerIconMob).should('be.visible');
      cy.get(this.headerIconMob).should('have.attr', 'src');
      cy.get(this.headerIconMob).should('have.attr', 'alt');
      cy.get(this.hamburgerMenu).click({ force: true });
    }
  }

  verifyHeaderLinks(linkName) {
    if (Cypress.config('viewportWidth') > 833) {
      cy.get(this.headerLinksDesk)
        .contains(new RegExp('\\b' + linkName + '\\b', 'i'))
        .should('exist')
        .and('have.length', 1);
    } else {
      cy.get(this.hamburgerMenu).click({ force: true });
      cy.get(this.headerLinksMob)
        .contains(new RegExp('\\b' + linkName + '\\b', 'i'))
        .should('exist')
        .and('have.length', 1);
      cy.get(this.hamburgerMenu).click({ force: true });
    }
  }
}
