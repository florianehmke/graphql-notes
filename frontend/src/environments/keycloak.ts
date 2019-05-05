import { KeycloakConfig } from 'keycloak-angular';

export const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'master',
  clientId: 'graphql-notes'
};