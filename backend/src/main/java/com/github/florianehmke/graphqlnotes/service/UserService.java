package com.github.florianehmke.graphqlnotes.service;

import com.github.florianehmke.graphqlnotes.persistence.model.Author;
import com.github.florianehmke.graphqlnotes.persistence.repository.AuthorRepository;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private AuthorRepository authorRepository;
  private KeycloakPrincipal<KeycloakSecurityContext> currentPrincipal;

  @Autowired
  public UserService(
      AuthorRepository authorRepository,
      KeycloakPrincipal<KeycloakSecurityContext> currentPrincipal) {
    this.authorRepository = authorRepository;
    this.currentPrincipal = currentPrincipal;
  }

  public Author loadCurrent() {
    return this.authorRepository
        .findByUserId(getCurrentUserId())
        .orElseGet(
            () -> {
              var author = new Author();
              author.setUserId(getCurrentUserId());
              author.setLastName(getCurrentUserLastName());
              author.setFirstName(getCurrentUserFirstName());
              return authorRepository.save(author);
            });
  }

  private String getCurrentUserFirstName() {
    return this.currentPrincipal.getKeycloakSecurityContext().getToken().getGivenName();
  }

  private String getCurrentUserLastName() {
    return this.currentPrincipal.getKeycloakSecurityContext().getToken().getFamilyName();
  }

  private String getCurrentUserId() {
    return this.currentPrincipal.getKeycloakSecurityContext().getToken().getPreferredUsername();
  }
}
