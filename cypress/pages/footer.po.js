export class FooterPo {
  footerIcon = 'footer [data-testid="footer-logo"] img';
  footerLinks = 'footer a';
  footerOurSocials = 'footer [data-testid="footer-socials"]';

  verifyFooterLogo() {
    cy.get(this.footerIcon).should('be.visible');
    cy.get(this.footerIcon).should('have.attr', 'src');
    cy.get(this.footerIcon).should('have.attr', 'alt');
  }

  verifyFooterLinks(linkName) {
    cy.get(this.footerLinks)
      .contains(new RegExp('\\b' + linkName + '\\b', 'i'))
      .should('exist')
      .and('have.length', 1);
  }

  verifyFooterSocialsTitle(title) {
    cy.get(this.footerOurSocials).find('p').should('have.text', title).and('be.visible');
  }

  verifyFooterSocialsIcons() {
    cy.get(this.footerOurSocials)
      .find('a')
      .should('have.length', 3)
      .each(($img) => {
        cy.get($img).should('have.attr', 'href');
        cy.get($img).find('img').should('have.attr', 'src');
        cy.get($img).find('img').should('have.attr', 'alt');
      });
  }
}
