package com.github.florianehmke.graphqlnotes.graphql;

import com.github.florianehmke.graphqlnotes.persistence.model.Author;
import com.github.florianehmke.graphqlnotes.persistence.repository.AuthorRepository;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
@GraphQLApi
public class AuthorController {

  private AuthorRepository authorRepository;

  @Autowired
  public AuthorController(AuthorRepository authorRepository) {
    this.authorRepository = authorRepository;
  }

  @GraphQLQuery(name = "authors")
  public Collection<Author> authors() {
    return authorRepository.findAll();
  }
}
