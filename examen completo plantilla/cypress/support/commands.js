Cypress.Commands.add('loginREJAP', (usuario = 'inava', password = '123') => {
  cy.visit('/')
  cy.wait(2000)
  cy.get('#username').clear().type(usuario)
  cy.get('#password').clear().type(password)
  cy.get('.ui-button-text').click()
  
  // Esperar cambio de URL en lugar de page load
  cy.url({ timeout: 15000 }).should('not.include', 'login.xhtml')
  cy.wait(3000)
  
  // Verificar dashboard
  cy.get('.active > a', { timeout: 15000 }).should('be.visible')
  cy.log(`✅ Login exitoso: ${usuario}`)
})

Cypress.Commands.add('verificarDashboard', () => {
  cy.get('.active > a').should('be.visible')
  cy.get('.nav').should('be.visible')
  cy.log('✅ Dashboard verificado')
})

Cypress.Commands.add('navegarA', (seccion) => {
  const selectores = {
    'solicitudes': '.active > a',
    'respuestas': ':nth-child(2) > a',
    'entregados': ':nth-child(3) > a',
    'anulados': ':nth-child(4) > a',
    'reportes': ':nth-child(5) > a',
    'contraseña': ':nth-child(6) > a'
  }
  
  const selector = selectores[seccion.toLowerCase()]
  if (selector) {
    cy.get(selector).click()
    cy.wait(1000)
    cy.log(`📍 Navegado a: ${seccion}`)
  }
})

Cypress.Commands.add('logoutREJAP', () => {
  cy.get('#j_idt20\\:j_idt21 > .ui-button-text').click()
  cy.wait(1000)
  cy.log('🚪 Sesión cerrada')
})

Cypress.Commands.add('esperarCarga', (tiempo = 2000) => {
  cy.wait(tiempo)
  cy.window().its('document.readyState').should('equal', 'complete')
})

Cypress.Commands.add('capturarPantalla', (nombre) => {
  const timestamp = new Date().getTime()
  cy.screenshot(`${nombre}_${timestamp}`)
  cy.log(`📸 Screenshot: ${nombre}`)
})

Cypress.Commands.add('registrarSolicitud', (ci, observaciones = 'CERTIFICADO PARA TRAMITE LABORAL') => {
  // Click en Nuevo
  cy.get('#formulario\\:tabla\\:j_idt26 > .ui-button-text').click()
  cy.wait(2000)
  
  // Ingresar CI
  cy.get('#formulariosolicitudes\\:docid').clear().type(ci + '{enter}')
  cy.wait(4000)
  
  // Completar campos requeridos
  cy.get('#formulariosolicitudes\\:fechanacido_input').type('01/01/1990')
  cy.get('#formulariosolicitudes\\:direccion').type('Av. Principal #123')
  
  // Seleccionar motivo
  cy.get('#formulariosolicitudes\\:motivo_label').click()
  cy.wait(500)
  cy.contains('.ui-selectonemenu-item', 'CONVOCATORIA').click()
  
  // Descripción
  cy.get('#formulariosolicitudes\\:detallemotivo').type('SOLICITUD DE CERTIFICADO PARA CONVOCATORIA LABORAL')
  
  // Checkbox y valorado
  cy.get('#formulariosolicitudes\\:docidentidad > .ui-chkbox-box').click()
  cy.get('#formulariosolicitudes\\:valorado_input').type(ci)
  
  // Guardar
  cy.get('#formulariosolicitudes\\:j_idt153 > .ui-button-text').click({ force: true })
  cy.wait(2000)
  
  // Confirmar
  cy.get('#formulariovalidar\\:observaciones').type(observaciones)
  cy.get('#formulariovalidar\\:acepta > .ui-button-text').click()
  cy.wait(3000)
  
  cy.log('✅ Solicitud registrada exitosamente')
})