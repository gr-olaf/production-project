describe('Пользователь заходит на страницу со списком статей', () => {
   beforeEach(() => {
      cy.login().then((data) => {
         cy.visit('articles');
      });
   });

   it('И статьи успешно подгружаются', () => {
      cy.getByTestId('ArticleList').should('exist');
      cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
   });

   it('Пример на стабах (фикстурах)', () => {
      cy.intercept('GET', '**/articles?*', { fixture: 'articles-list.json' });
      cy.getByTestId('ArticleList').should('exist');
      cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
   });

   it.skip('Пример заскипанного теста', () => {
      cy.getByTestId('ArticleList').should('exist');
      cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
      cy.getByTestId('asfdas').should('exist');
   });
});
