import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import GET_QUERY from './graphql/graphql.queries';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private apollo: Apollo) {}

  public getChekinDetail(
    bookingCode: string,
    lastName: string
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo.query({
      query: GET_QUERY,
      variables: {
        input: {
          bookingCode,
          lastName,
        },
      },
    });
  }
}
