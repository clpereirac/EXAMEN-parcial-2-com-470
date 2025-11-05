import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// LOGIN
Given('que el usuario ha iniciado sesión en el sistema', () => {
  cy.visit('/');
  cy.get('#username').clear().type('inava');
  cy.get('#password').clear().type('123');
  cy.get('.ui-button-text').click();
  cy.get('.active > a', { timeout: 20000 }).should('be.visible');
});

// BOTON NUEVO
When('el usuario hace click en el botón Nuevo', () => {
  cy.get('#formulario\\:tabla\\:j_idt26').click();
  cy.get('.ui-dialog:visible', { timeout: 20000 }).should('exist');
});

// INGRESAR CI
When('el usuario ingresa el número de documento {string}', (ci) => {
  cy.get('#formulariosolicitudes\\:docid', { timeout: 20000 })
    .should('be.visible')
    .clear()
    .type(ci)
    .type('{enter}');
  
  // Esperar que se complete el autocompletado
  cy.wait(2000);
});

// COMPLETAR FECHA
When('el usuario completa la fecha de nacimiento {string}', (fecha) => {
  cy.get('#formulariosolicitudes\\:fechanacido_input')
    .clear()
    .type(fecha);
});

// COMPLETAR DOMICILIO
When('el usuario completa el domicilio {string}', (domicilio) => {
  cy.get('#formulariosolicitudes\\:direccion')
    .clear()
    .type(domicilio);
});

// SELECCIONAR MOTIVO - CORREGIDO
When('el usuario selecciona el motivo de la solicitud', () => {
  // Hacer scroll al elemento para asegurar que esté visible
  cy.get('#formulariosolicitudes\\:motivo_label').scrollIntoView();
  
  // Click en el trigger del dropdown
  cy.get('#formulariosolicitudes\\:motivo').within(() => {
    cy.get('.ui-selectonemenu-trigger').click();
  });
  
  // Esperar a que aparezca el panel de opciones
  cy.get('#formulariosolicitudes\\:motivo_panel', { timeout: 5000 })
    .should('be.visible');
  
  // Seleccionar la opción que contiene "CONVOCATORIA"
  cy.get('#formulariosolicitudes\\:motivo_panel')
    .contains('CONVOCATORIA')
    .click({ force: true });
  
  // Verificar que se seleccionó
  cy.get('#formulariosolicitudes\\:motivo_label')
    .should('contain', 'CONVOCATORIA');
});

// DESCRIPCION
When('el usuario ingresa la descripción del motivo {string}', (desc) => {
  cy.get('#formulariosolicitudes\\:detallemotivo')
    .clear()
    .type(desc);
});

// VALORADO
When('el usuario ingresa el número de valorado {string}', (val) => {
  cy.get('#formulariosolicitudes\\:valorado_input')
    .clear()
    .type(val);
});

// CHECKBOX
When('el usuario marca el checkbox de documento identidad', () => {
  cy.get('#formulariosolicitudes\\:docidentidad > .ui-chkbox-box')
    .scrollIntoView()
    .click({ force: true });
});

// GUARDAR
When('el usuario hace click en el botón Guardar', () => {
  cy.get('#formulariosolicitudes\\:j_idt153')
    .scrollIntoView()
    .click({ force: true });
  
  // Esperar a que aparezca el diálogo
  cy.wait(1000);
});

// OBSERVACIONES
When('el usuario ingresa observaciones {string}', (obs) => {
  cy.get('#formulariovalidar\\:observaciones', { timeout: 20000 })
    .should('be.visible')
    .clear()
    .type(obs);
});

// ACEPTAR
When('el usuario hace click en Aceptar en el diálogo', () => {
  cy.get('#formulariovalidar\\:acepta')
    .click({ force: true });
  
  // Esperar procesamiento
  cy.wait(2000);
});

// VERIFICACIONES
Then('el sistema debe autocompletar el nombre {string}', (nombre) => {
  cy.get('#formulariosolicitudes\\:nombres')
    .should('have.value', nombre);
});

Then('el sistema debe autocompletar el primer apellido {string}', (apellido) => {
  cy.get('#formulariosolicitudes\\:paterno')
    .should('have.value', apellido);
});

Then('el sistema debe autocompletar el departamento {string}', (depto) => {
  cy.get('#formulariosolicitudes\\:departamento_label')
    .should('contain.text', depto);
});

Then('el sistema debe mostrar el diálogo de confirmación', () => {
  cy.get('#dialogoconfirm_title', { timeout: 10000 })
    .should('be.visible');
});

Then('el certificado debe aparecer en la lista de impresión', () => {
  cy.contains('Imprimir', { timeout: 10000 })
    .should('be.visible');
});