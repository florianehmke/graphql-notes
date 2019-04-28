package com.github.florianehmke.graphqlnotes.graphql;

import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import com.github.florianehmke.graphqlnotes.persistence.repository.NoteRepository;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
@GraphQLApi
public class NoteController {

  private NoteRepository noteRepository;

  @Autowired
  public NoteController(NoteRepository noteRepository) {
    this.noteRepository = noteRepository;
  }

  @GraphQLQuery(name = "notesByAuthorId")
  public Collection<Note> notesByAuthorId(Long authorId) {
    return noteRepository.findByAuthorId(authorId);
  }
}
