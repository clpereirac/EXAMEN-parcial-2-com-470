const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magistratura.organojudicial.gob.bo:8888/',
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    chromeWebSecurity: false,

    // ===== TIMEOUTS OPTIMIZADOS =====
    // Reducidos para fallar más rápido si hay problemas
    defaultCommandTimeout: 10000,  // ⚡ Reducido de 20s a 10s
    pageLoadTimeout: 60000,        // ⚡ Reducido de 120s a 60s
    requestTimeout: 8000,          // ⚡ Reducido de 10s a 8s
    responseTimeout: 15000,        // ⚡ Aumentado de 10s a 15s (para requests lentos)
    
    // ===== VIEWPORT =====
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // ===== VELOCIDAD MÁXIMA ===== 
    video: false,                  // ⚡⚡ CRÍTICO: Desactivar video (2-3x más rápido)
    screenshotOnRunFailure: true,  // ✅ Mantener screenshots solo en fallos
    
    // ===== OPTIMIZACIONES DE MEMORIA =====
    numTestsKeptInMemory: 1,       // ⚡ Solo mantener 1 test en memoria
    experimentalMemoryManagement: true, // ⚡ Gestión automática de memoria
    
    // ===== OPTIMIZACIONES ADICIONALES =====
    experimentalStudio: false,
    retries: {
      runMode: 2,    // ✅ Reintentar tests fallidos en CI (2 veces)
      openMode: 0    // ❌ No reintentar en modo desarrollo
    },
    
    // ===== CONFIGURACIÓN AVANZADA =====
    experimentalModifyObstructiveThirdPartyCode: true, // Modifica código third-party que bloquea
    experimentalOriginDependencies: true, // Mejor manejo de orígenes cruzados
    
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      
      on('file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // ===== OPTIMIZACIÓN DE NAVEGADOR =====
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'edge') {
          // Desactivar características que consumen recursos
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--disable-software-rasterizer');
          launchOptions.args.push('--disable-extensions');
          launchOptions.args.push('--disable-background-timer-throttling');
          launchOptions.args.push('--disable-backgrounding-occluded-windows');
          launchOptions.args.push('--disable-renderer-backgrounding');
          launchOptions.args.push('--no-sandbox');
          
          // Preallocate memory
          launchOptions.args.push('--js-flags=--max-old-space-size=4096');
          
          return launchOptions;
        }
        
        if (browser.name === 'electron') {
          // Electron es más rápido por defecto
          launchOptions.preferences.fullscreen = false;
          return launchOptions;
        }
      });

      // ===== LOGS OPCIONALES (comentar para desactivar) =====
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        }
      });
      
      return config;
    },
  },
  
  // ===== VARIABLES DE ENTORNO =====
  env: {
    username: 'inava',
    password: '123',
    // Añade otras variables que necesites
  }
});