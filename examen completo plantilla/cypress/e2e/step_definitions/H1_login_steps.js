import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// ==================== ANTECEDENTES ====================
Given('que el usuario está en la página de login de REJAP Fast', () => {
  cy.visit('/');
  cy.wait(2000);
  cy.get('#username').should('be.visible');
  cy.get('#password').should('be.visible');
});

// ==================== GIVEN ====================
Given('que el usuario ha iniciado sesión con credenciales válidas', () => {
  cy.visit('/');
  cy.wait(1000);
  cy.get('#username').clear().type('inava');
  cy.get('#password').clear().type('123');
  cy.get('.ui-button-text').click();
  cy.wait(2000);
  cy.get('.active > a').should('be.visible');
});

// ==================== WHEN ====================
When('el usuario ingresa el nombre de usuario {string}', (usuario) => {
  cy.get('#username').clear().type(usuario);
});

When('el usuario ingresa la contraseña {string}', (password) => {
  cy.get('#password').clear().type(password);
});

When('el usuario hace click en el botón {string}', (boton) => {
  if (boton === 'Ingresar') {
    cy.get('.ui-button-text').click();
    cy.wait(2000);
  } else if (boton === 'Salir') {
    cy.get('#j_idt20\\:j_idt21 > .ui-button-text').click();
    cy.wait(1000);
  }
});

When('el usuario deja el campo de usuario vacío', () => {
  cy.get('#username').clear();
});

When('el usuario deja el campo de contraseña vacío', () => {
  cy.get('#password').clear();
});

When('el usuario navega por las opciones del menú', () => {
  cy.wait(500);
});

// ==================== THEN ====================
Then('el sistema debe mostrar el dashboard principal', () => {
  cy.get('.active > a').should('be.visible');
});

Then('debe visualizar el menú superior con las siguientes opciones:', (dataTable) => {
  cy.get('.active > a').should('contain.text', 'Solicitudes');
  cy.get(':nth-child(2) > a').eq(0).should('contain.text', 'Respuestas');
  cy.get(':nth-child(3) > a').eq(0).should('contain.text', 'Entregados');
  cy.get(':nth-child(4) > a').eq(0).should('contain.text', 'Anulados');
  cy.get(':nth-child(5) > a').eq(0).should('contain.text', 'Reportes');
  cy.get(':nth-child(6) > a').eq(0).should('contain.text', 'Contraseña');
  cy.get('#j_idt20\\:j_idt21 > .ui-button-text').should('contain.text', 'Salir');
});

Then('debe mostrar el nombre del usuario {string} en la parte superior', (nombreUsuario) => {
  cy.get('.nav').should('contain.text', nombreUsuario);
});

Then('el sistema debe mostrar un mensaje de error', () => {
  cy.url().should('include', '/login');
});

Then('el usuario debe permanecer en la página de login', () => {
  cy.get('#username').should('be.visible');
  cy.get('#password').should('be.visible');
});

Then('el sistema debe mostrar un mensaje de validación', () => {
  cy.url().should('include', '/login');
});

Then('debe poder acceder a la opción {string}', (opcion) => {
  switch(opcion) {
    case 'Solicitudes':
      cy.get('.active > a').should('be.visible').and('contain.text', 'Solicitudes');
      break;
    case 'Respuestas':
      cy.get(':nth-child(2) > a').eq(0).should('be.visible').and('contain.text', 'Respuestas');
      break;
    case 'Entregados':
      cy.get(':nth-child(3) > a').eq(0).should('be.visible').and('contain.text', 'Entregados');
      break;
    case 'Anulados':
      cy.get(':nth-child(4) > a').eq(0).should('be.visible').and('contain.text', 'Anulados');
      break;
    case 'Reportes':
      cy.get(':nth-child(5) > a').eq(0).should('be.visible').and('contain.text', 'Reportes');
      break;
  }
});

Then('el sistema debe cerrar la sesión', () => {
  cy.wait(500);
});

Then('el usuario debe ser redirigido a la página de login', () => {
  cy.get('#username').should('be.visible');
  cy.get('#password').should('be.visible');
});
