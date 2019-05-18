package com.github.florianehmke.graphqlnotes.controller;

import com.github.florianehmke.graphqlnotes.configuration.Role;
import com.github.florianehmke.graphqlnotes.permission.UserId;
import com.github.florianehmke.graphqlnotes.permission.VerifyUser;
import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import com.github.florianehmke.graphqlnotes.service.NoteService;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.annotation.security.RolesAllowed;
import java.util.Collection;

@Controller
@GraphQLApi
@RolesAllowed(Role.USER)
public class NoteController {

  private NoteService noteService;

  @Autowired
  public NoteController(NoteService noteService) {
    this.noteService = noteService;
  }

  @VerifyUser
  @GraphQLQuery
  public Collection<Note> notes(Long bookId, @UserId Long userId, String searchTerm) {
    return noteService.findBy(bookId, userId, searchTerm);
  }

  @GraphQLMutation
  public boolean deleteNote(Long noteId) {
    return noteService.deleteNote(noteId);
  }

  @GraphQLMutation
  public Note addNote(String bookTitle, String title, String content) {
    return noteService.addNote(bookTitle, title, content);
  }
}
