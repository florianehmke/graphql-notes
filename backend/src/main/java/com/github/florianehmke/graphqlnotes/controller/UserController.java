package com.github.florianehmke.graphqlnotes.controller;

import com.github.florianehmke.graphqlnotes.configuration.Role;
import com.github.florianehmke.graphqlnotes.persistence.model.User;
import com.github.florianehmke.graphqlnotes.service.UserService;
import io.leangen.graphql.annotations.GraphQLContext;
import io.leangen.graphql.annotations.GraphQLEnvironment;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.execution.ResolutionEnvironment;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.annotation.security.RolesAllowed;
import java.util.Collection;
import java.util.concurrent.CompletableFuture;

@Controller
@GraphQLApi
@RolesAllowed(Role.USER)
public class UserController {

  private UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
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
  public CompletableFuture<Object> noteCount(
      @GraphQLContext User user, @GraphQLEnvironment ResolutionEnvironment env) {
    return env.dataFetchingEnvironment.getDataLoader("noteCount").load(user);
  }
}
