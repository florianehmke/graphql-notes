package com.github.florianehmke.graphqlnotes.configuration;

import com.github.florianehmke.graphqlnotes.persistence.repository.AuthorRepository;
import com.github.florianehmke.graphqlnotes.persistence.repository.NoteRepository;
import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GraphQLDataFetchers {

  private AuthorRepository authorRepository;
  private NoteRepository noteRepository;

  @Autowired
  public GraphQLDataFetchers(AuthorRepository authorRepository, NoteRepository noteRepository) {
    this.authorRepository = authorRepository;
    this.noteRepository = noteRepository;
  }

  public DataFetcher getAuthorsDataFetcher() {
    return dataFetchingEnvironment -> authorRepository.findAll();
  }

  public DataFetcher getNotesByAuthorIdDataFetcher() {
    return dataFetchingEnvironment -> {
      Long authorId = Long.valueOf(dataFetchingEnvironment.getArgument("authorId"));
      return noteRepository.findByAuthorId(authorId);
    };
  }
}
