import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

Cypress.config('defaultCommandTimeout', 10000)
Cypress.config('pageLoadTimeout', 60000)

before(() => {
  cy.log('🚀 Iniciando Suite de Pruebas REJAP Fast')
})

after(() => {
  cy.log('✅ Suite de Pruebas Completada')
})