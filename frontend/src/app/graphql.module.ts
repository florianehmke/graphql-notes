import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';

import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { environment } from '../environments/environment';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(apollo: Apollo, private httpClient: HttpClient) {
    const subscriptionLink = new WebSocketLink({
      uri: environment.gqlWebsocketEndpoint,
      options: {
        reconnect: true,
      }
    });

    const httpLink = new HttpLink(httpClient).create({
      uri: environment.gqlEndpoint,
    });

    const link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      subscriptionLink,
      httpLink,
    );

    apollo.create({
      link,
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all'
        },
        mutate: {
          errorPolicy: 'all'
        },
        query: {
          errorPolicy: 'all'
        }
      },
      cache: new InMemoryCache()
    });
  }
}
