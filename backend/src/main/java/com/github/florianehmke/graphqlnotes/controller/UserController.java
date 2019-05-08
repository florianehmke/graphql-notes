package com.github.florianehmke.graphqlnotes.controller;

import com.github.florianehmke.graphqlnotes.persistence.model.User;
import com.github.florianehmke.graphqlnotes.persistence.repository.NoteRepository;
import com.github.florianehmke.graphqlnotes.service.UserService;
import io.leangen.graphql.annotations.GraphQLContext;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.Collection;

@Controller
@GraphQLApi
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
  @PreAuthorize("hasRole('admin')")
  public Long noteCount(@GraphQLContext User user) {
    return noteRepository.countByUserId(user.getId());
  }
}
