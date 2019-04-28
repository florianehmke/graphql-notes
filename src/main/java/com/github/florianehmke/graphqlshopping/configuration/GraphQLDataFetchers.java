package com.github.florianehmke.graphqlshopping.configuration;

import com.github.florianehmke.graphqlshopping.persistence.repository.AuthorRepository;
import com.github.florianehmke.graphqlshopping.persistence.repository.EntryRepository;
import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GraphQLDataFetchers {

  private AuthorRepository authorRepository;
  private EntryRepository entryRepository;

  @Autowired
  public GraphQLDataFetchers(AuthorRepository authorRepository, EntryRepository entryRepository) {
    this.authorRepository = authorRepository;
    this.entryRepository = entryRepository;
  }

  public DataFetcher getAuthorsDataFetcher() {
    return dataFetchingEnvironment -> authorRepository.findAll();
  }

  public DataFetcher getEntriesByAuthorIdDataFetcher() {
    return dataFetchingEnvironment -> {
      Long authorId = Long.valueOf(dataFetchingEnvironment.getArgument("authorId"));
      return entryRepository.findByAuthorId(authorId);
    };
  }
}
