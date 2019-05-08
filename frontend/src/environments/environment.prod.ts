import { KeycloakConfig } from 'keycloak-angular';

export const environment = {
  production: true,
  keycloak: <KeycloakConfig>{
    url: 'http://keycloak:8080/auth',
    realm: 'master',
    clientId: 'graphql-notes'
  },
  gqlEndpoint: 'http://backend:10000/graphql'
};
