import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
let keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'master',
  clientId: 'graphql-notes'
};

export const environment = {
  production: false,
  keycloak: keycloakConfig
};
