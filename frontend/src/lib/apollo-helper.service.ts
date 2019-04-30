import { Apollo, QueryRef } from 'apollo-angular';
import { WatchQueryOptions } from 'apollo-client';
import { GraphQLError } from 'graphql';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { R } from 'apollo-angular/types';

@Injectable()
export class ApolloHelperService {
  constructor(private apollo: Apollo) {}

  setupQuery<T, V = R>(
    queryOptions: WatchQueryOptions<V>
  ): {
    queryRef: QueryRef<T, V>;
    data$: Observable<T>;
    loading$: Observable<boolean>;
    errors$?: Observable<ReadonlyArray<GraphQLError>>;
  } {
    const queryRef = this.apollo.watchQuery<T, V>(queryOptions);
    const data$ = queryRef.valueChanges.pipe<T>(map(result => result.data));
    const loading$ = queryRef.valueChanges.pipe(map(result => result.loading));
    const errors$ = queryRef.valueChanges.pipe(map(result => result.errors));

    return {
      queryRef,
      data$,
      loading$,
      errors$
    };
  }
}
