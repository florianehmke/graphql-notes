package com.github.florianehmke.graphqlnotes.graphql;

import com.github.florianehmke.graphqlnotes.persistence.model.Author;
import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import com.github.florianehmke.graphqlnotes.persistence.repository.AuthorRepository;
import com.github.florianehmke.graphqlnotes.persistence.repository.NoteRepository;
import io.leangen.graphql.annotations.GraphQLContext;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
@GraphQLApi
public class NoteController {

  private NoteRepository noteRepository;
  private AuthorRepository authorRepository;

  @Autowired
  public NoteController(NoteRepository noteRepository, AuthorRepository authorRepository) {
    this.noteRepository = noteRepository;
    this.authorRepository = authorRepository;
  }

  @GraphQLQuery(name = "notesByAuthorId")
  public Collection<Note> notesByAuthorId(Long authorId) {
    return noteRepository.findByAuthorId(authorId);
  }

  @GraphQLQuery(name = "noteCount")
  public Long noteCount(@GraphQLContext Author author) {
    return noteRepository.countByAuthorId(author.getId());
  }

  @GraphQLQuery(name = "authors")
  public Collection<Author> authors() {
    return authorRepository.findAll();
  }

  @GraphQLMutation
  public Author addAuthor(String firstName, String lastName) {
    var author = new Author();
    author.setFirstName(firstName);
    author.setLastName(lastName);
    return authorRepository.save(author);
  }

  @GraphQLMutation
  public Note addNote(Long authorId, String title, String content) {
    var note = new Note();
    note.setAuthor(authorRepository.findById(authorId).orElseThrow(() -> new IllegalArgumentException("Möp")));
    note.setNoteTitle(title);
    note.setNoteContent(content);
    return noteRepository.save(note);
  }
}
