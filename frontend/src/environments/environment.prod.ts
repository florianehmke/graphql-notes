import { keycloakConfig } from './keycloak';

export const environment = {
  production: true,
  keycloak: keycloakConfig,
  gqlEndpoint: 'http://localhost:10000/graphql'
};
