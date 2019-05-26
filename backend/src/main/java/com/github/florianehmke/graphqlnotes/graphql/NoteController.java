package com.github.florianehmke.graphqlnotes.graphql;

import com.github.florianehmke.graphqlnotes.configuration.Role;
import com.github.florianehmke.graphqlnotes.graphql.parameters.AddNote;
import com.github.florianehmke.graphqlnotes.graphql.parameters.DeleteNote;
import com.github.florianehmke.graphqlnotes.graphql.parameters.NotesFilter;
import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import com.github.florianehmke.graphqlnotes.service.NoteService;
import com.github.florianehmke.graphqlnotes.service.UserService;
import io.leangen.graphql.annotations.GraphQLContext;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.annotation.security.RolesAllowed;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@Controller
@GraphQLApi
@RolesAllowed(Role.USER)
public class NoteController {

  private UserService userService;
  private NoteService noteService;

  @Autowired
  public NoteController(UserService userService, NoteService noteService) {
    this.userService = userService;
    this.noteService = noteService;
  }

  @GraphQLQuery(description = "Loads notes matching the given parameters.")
  public Collection<Note> notes(NotesFilter param) {
    var filter = param == null ? NotesFilter.emptyFilter() : param;
    return noteService.findBy(filter.getBookId(), filter.getUserId(), filter.getSearchTerm());
  }

  @GraphQLQuery
  public boolean deletable(@GraphQLContext Note note) {
    var user = userService.currentUser();
    return note.getCreatedBy().getId().equals(user.getId());
  }

  @GraphQLMutation(description = "Deletes a note identified by the given parameter.")
  public boolean deleteNote(@NotNull DeleteNote param) {
    return noteService.deleteNote(param.getNoteId());
  }

  @GraphQLMutation(description = "Adds a note with the given title/content to the given book.")
  public Note addNote(@NotNull AddNote param) {
    var user = userService.currentUser();
    return noteService.addNote(param.getBookTitle(), param.getNoteTitle(), param.getContent());
  }
}
