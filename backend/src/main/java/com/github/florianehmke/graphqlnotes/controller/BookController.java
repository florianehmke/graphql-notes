package com.github.florianehmke.graphqlnotes.controller;

import com.github.florianehmke.graphqlnotes.configuration.Role;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.stereotype.Controller;

import javax.annotation.security.RolesAllowed;

@Controller
@GraphQLApi
@RolesAllowed(Role.USER)
public class BookController {}
