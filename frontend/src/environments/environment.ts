import { keycloakConfig } from './keycloak';

export const environment = {
  production: false,
  keycloak: keycloakConfig,
  gqlEndpoint: 'http://localhost:10000/graphql'
};
