# Build

- Frontend: 
    1. npm ci
    2. ng build --prod

- Backend:
    1. mvn clean package

# Startup

1. docker-compose up mariadb (let mariadb initialize)
2. CTRL-C (stop container)
3. docker-compose up

# Accounts

1. keycloak: admin:admin
2. mariadb:
    - root:root
    - keycloak:keycloak
    - graphql_notes:graphql_notes

# URLs
1. http://localhost:8080 - keycloak
2. http://localhost:10000 - backend
3. http://localhost:10001 - frontend