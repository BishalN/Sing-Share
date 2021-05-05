// describe('My first test', function () {
//   it('Visit the SingAndShare App', function () {
//     cy.visit('https://sing-share.vercel.app/');

//     cy.contains('Login').click();

//     cy.url().should('include', '/login');

//     cy.get('#usernameOrEmail')
//       .type('Bishal Neupane')
//       .should('have.value', 'Bishal Neupane');
//   });
// });

describe('This is the home page', function () {
  beforeEach(() => {
    // cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
    // .its('body')
    // .as('currentUser')
  });
  it('Load the home page', function () {
    cy.visit('/');
  });
});
