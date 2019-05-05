package com.github.florianehmke.graphqlnotes.controller;

import com.github.florianehmke.graphqlnotes.persistence.model.Author;
import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import com.github.florianehmke.graphqlnotes.persistence.repository.AuthorRepository;
import com.github.florianehmke.graphqlnotes.persistence.repository.NoteRepository;
import com.github.florianehmke.graphqlnotes.service.UserService;
import io.leangen.graphql.annotations.GraphQLContext;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.Collection;

import static com.github.florianehmke.graphqlnotes.persistence.repository.NoteSpecifications.searchBy;

@Controller
@GraphQLApi
public class NoteController {

  private NoteRepository noteRepository;
  private AuthorRepository authorRepository;
  private UserService userService;

  @Autowired
  public NoteController(NoteRepository noteRepository, AuthorRepository authorRepository, UserService userService) {
    this.noteRepository = noteRepository;
    this.authorRepository = authorRepository;
    this.userService = userService;
  }

  @GraphQLQuery
  public Collection<Note> notes(Long authorId, String searchTerm) {
    return noteRepository.findAll(searchBy(authorId, searchTerm));
  }

  @GraphQLQuery
  @PreAuthorize("hasRole('admin')")
  public Long noteCount(@GraphQLContext Author author) {
    return noteRepository.countByAuthorId(author.getId());
  }

  @GraphQLQuery
  public Collection<Author> authors() {
    return authorRepository.findAll();
  }

  @GraphQLMutation
  public void deleteNote(Long noteId) {
    this.noteRepository.delete(
        this.noteRepository
            .findById(noteId)
            .orElseThrow(() -> new ClientException("not_found", "Note does not exist!")));
  }

  @GraphQLMutation
  public Note addNote(Long authorId, String title, String content) {
    var author = this.userService.loadCurrent();
    var note = new Note();
    note.setAuthor(author);
    note.setNoteTitle(title);
    note.setNoteContent(content);
    return noteRepository.save(note);
  }
}
