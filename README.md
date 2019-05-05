# Startup

1. docker-compose up mariadb (let mariadb initialize)
2. docker-compose up

# Accounts

1. keycloak: admin:admin
2. mariadb:
    - root:root
    - keycloak:keycloak
    - graphql_notes:graphql_notes

# Ports
1. 8080 - keycloak
2. 10000 - backend
3. 10001 - frontend