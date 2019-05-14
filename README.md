# About

A small example application that uses `GraphQL` with a `Spring Boot` backend and an `Angular` frontend.

Technologies used:
1. [Apllo GraphQL Angular Client](https://www.apollographql.com/docs/angular/)
2. [GraphQL Code Generator](https://graphql-code-generator.com/)
3. [GraphQL SPQR](https://github.com/leangen/graphql-spqr)
4. [GraphQL SPQR Spring Boot Starter](https://github.com/leangen/graphql-spqr-spring-boot-starter)

# Start the Application (...with docker-compose)
## 1. Build

- Frontend: `npm ci && ng build --prod`
- Backend: `mvn clean package`

## 2. Startup

1. `docker-compose up mariadb` (let mariadb initialize)
2. Press CTRL-C (stop container)
3. `docker-compose up`

Backend, Frontend and Keycloak should be running under the following URLs:
1. http://keycloak:8080 - keycloak (login with admin:admin)
2. http://backend:10000 - backend
3. http://frontend:10001 - frontend
4. http://backend:10000/gui - GraphQL Playground

Mariadb listens on port `3036` and has the following users configured:
- root:root
- keycloak:keycloak
- graphql_notes:graphql_notes


## 3. Configuration

Keycloak needs to be configured. On realm `master` add the client `graphql-notes` with roles `user` and `admin`.

# State Management
Apollo offers a complete state management solution including client side (local) state. 
However (I personally) don't like it because writing gql queries / mutations for something as simple as client side flag feels wrong.

Instead I prefer a simple `BehaviourSubject`-based service for local state in combination with keeping related Apollo `QueryRef`s in the same service. Components interact solely with that service and have no means to tell local and backend state apart. Since Apollo's `QueryRef`s behave similar to `RxJS` subjects (subscribe once, get values for all subsequent refetches) this is very easy to achieve. 

Such a solution has multiple advantages:
- It is easy to swap the `BehaviourSubject` for local state with e.g. `NgRx` if things become too complex.
- Only the services have to be touched if the GraphQL backend has to be replaced with e.g. a REST API.

That said, I can imaging that the possibility to combine client and server state in the graph-ql schema might come in handy.


# ToDo
- Authenticate over WebSocket

