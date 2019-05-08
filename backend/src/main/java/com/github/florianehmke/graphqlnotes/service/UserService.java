package com.github.florianehmke.graphqlnotes.service;

import com.github.florianehmke.graphqlnotes.persistence.model.User;
import com.github.florianehmke.graphqlnotes.persistence.repository.UserRepository;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private UserRepository userRepository;
  private KeycloakPrincipal<KeycloakSecurityContext> currentPrincipal;

  @Autowired
  public UserService(
      UserRepository userRepository, KeycloakPrincipal<KeycloakSecurityContext> currentPrincipal) {
    this.userRepository = userRepository;
    this.currentPrincipal = currentPrincipal;
  }

  public User loadCurrent() {
    return this.userRepository
        .findByUserId(getCurrentUserId())
        .orElseGet(
            () -> {
              var user = new User();
              user.setUserId(getCurrentUserId());
              user.setLastName(getCurrentUserLastName());
              user.setFirstName(getCurrentUserFirstName());
              return userRepository.save(user);
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
