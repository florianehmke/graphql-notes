# About

A small example application that uses `GraphQL` with a `Spring Boot` backend and an `Angular` frontend.

Technologies used:
1. [Apllo GraphQL Angular Client](https://www.apollographql.com/docs/angular/)
2. [GraphQL Code Generator](https://graphql-code-generator.com/)
3. [GraphQL SPQR](https://github.com/leangen/graphql-spqr)
4. [GraphQL SPQR Spring Boot Starter](https://github.com/leangen/graphql-spqr-spring-boot-starter)

# Start the Application (...with docker-compose)
## 1. Build

- Frontend: npm ci && ng build --prod
- Backend: mvn clean package

## 2. Startup

1. docker-compose up mariadb (let mariadb initialize)
2. CTRL-C (stop container)
3. docker-compose up

Backend, Frontend and Keycloak should be running under the following URLs:
1. http://keycloak:8080 - keycloak (login with admin:admin)
2. http://backend:10000 - backend
3. http://frontend:10001 - frontend

Mariadb listens on port `3036` and has the following users configured:
- root:root
- keycloak:keycloak
- graphql_notes:graphql_notes


## 3. Configuration

Keycloak needs to be configured. On realm `master` add the client `graphql-notes` with roles `user` and `admin`.
