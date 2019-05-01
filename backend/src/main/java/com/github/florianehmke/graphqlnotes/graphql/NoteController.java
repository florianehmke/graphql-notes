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

import static com.github.florianehmke.graphqlnotes.persistence.repository.NoteSpecifications.searchBy;

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

  @GraphQLQuery
  public Collection<Note> notes(Long authorId, String searchTerm) {
    return noteRepository.findAll(searchBy(authorId, searchTerm));
  }

  @GraphQLQuery
  public Long noteCount(@GraphQLContext Author author) {
    return noteRepository.countByAuthorId(author.getId());
  }

  @GraphQLQuery
  public Collection<Author> authors() {
    return authorRepository.findAll();
  }

  @GraphQLMutation
  public boolean deleteNote(Long noteId) {
    return this.noteRepository
        .findById(noteId)
        .map(
            note -> {
              noteRepository.delete(note);
              return true;
            })
        .orElse(false);
  }

  @GraphQLMutation
  public Note addNote(Long authorId, String title, String content) {
    var author =
        authorRepository.findById(authorId).orElseThrow(() -> new IllegalArgumentException("Möp"));
    var note = new Note();
    note.setAuthor(author);
    note.setNoteTitle(title);
    note.setNoteContent(content);
    return noteRepository.save(note);
  }
}
