package com.github.florianehmke.graphqlnotes.controller;

import com.github.florianehmke.graphqlnotes.configuration.Role;
import com.github.florianehmke.graphqlnotes.persistence.model.User;
import com.github.florianehmke.graphqlnotes.persistence.repository.NoteRepository;
import com.github.florianehmke.graphqlnotes.service.UserService;
import io.leangen.graphql.annotations.GraphQLContext;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.stereotype.Controller;

import javax.annotation.security.RolesAllowed;
import java.util.Collection;

@Controller
@GraphQLApi
@RolesAllowed(Role.USER)
public class UserController {

  private UserService userService;
  private NoteRepository noteRepository;

  public UserController(UserService userService, NoteRepository noteRepository) {
    this.userService = userService;
    this.noteRepository = noteRepository;
  }

  @GraphQLQuery
  public Collection<User> users() {
    return userService.findAll();
  }

  @GraphQLQuery
  public User currentUser() {
    return userService.currentUser();
  }

  @GraphQLQuery
  @RolesAllowed(Role.ADMIN)
  public Long noteCount(@GraphQLContext User user) {
    return noteRepository.countByUserId(user.getId());
  }
}
