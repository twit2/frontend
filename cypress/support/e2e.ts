// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import { APIConfiguration } from '../../src/api/APIConfiguration';

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.env("test-username", `cyuser_${Math.floor(Math.random() * 100000)}`);
Cypress.env("test-password", 'test');
Cypress.env("gateway-url", APIConfiguration.apiGwUrl);