package com.github.florianehmke.graphqlnotes.controller;

import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import com.github.florianehmke.graphqlnotes.persistence.model.User;
import com.github.florianehmke.graphqlnotes.persistence.repository.NoteRepository;
import com.github.florianehmke.graphqlnotes.persistence.repository.UserRepository;
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
  private UserRepository userRepository;
  private UserService userService;

  @Autowired
  public NoteController(NoteRepository noteRepository, UserRepository userRepository, UserService userService) {
    this.noteRepository = noteRepository;
    this.userRepository = userRepository;
    this.userService = userService;
  }

  @GraphQLQuery
  public Collection<Note> notes(Long userId, String searchTerm) {
    return noteRepository.findAll(searchBy(userId, searchTerm));
  }

  @GraphQLQuery
  @PreAuthorize("hasRole('admin')")
  public Long noteCount(@GraphQLContext User user) {
    return noteRepository.countByUserId(user.getId());
  }

  @GraphQLQuery
  public Collection<User> users() {
    return userRepository.findAll();
  }

  @GraphQLMutation
  public void deleteNote(Long noteId) {
    this.noteRepository.delete(
        this.noteRepository
            .findById(noteId)
            .orElseThrow(() -> new ClientException("not_found", "Note does not exist!")));
  }

  @GraphQLMutation
  public Note addNote(String title, String content) {
    var user = this.userService.loadCurrent();
    var note = new Note();
    note.setUser(user);
    note.setNoteTitle(title);
    note.setNoteContent(content);
    return noteRepository.save(note);
  }
}
