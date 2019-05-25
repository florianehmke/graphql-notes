package com.github.florianehmke.graphqlnotes.graphql;

import com.github.florianehmke.graphqlnotes.configuration.Role;
import com.github.florianehmke.graphqlnotes.graphql.dto.NoteDto;
import com.github.florianehmke.graphqlnotes.graphql.mapper.NoteMapper;
import com.github.florianehmke.graphqlnotes.graphql.parameters.AddNote;
import com.github.florianehmke.graphqlnotes.graphql.parameters.DeleteNote;
import com.github.florianehmke.graphqlnotes.graphql.parameters.NotesFilter;
import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import com.github.florianehmke.graphqlnotes.persistence.model.User;
import com.github.florianehmke.graphqlnotes.service.NoteService;
import com.github.florianehmke.graphqlnotes.service.UserService;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.annotation.security.RolesAllowed;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.stream.Collectors;

@Controller
@GraphQLApi
@RolesAllowed(Role.USER)
public class NoteController {

  private UserService userService;
  private NoteService noteService;
  private NoteMapper noteMapper;

  @Autowired
  public NoteController(UserService userService, NoteService noteService, NoteMapper noteMapper) {
    this.userService = userService;
    this.noteService = noteService;
    this.noteMapper = noteMapper;
  }

  @GraphQLQuery(description = "Loads notes matching the given parameters.")
  public Collection<NoteDto> notes(NotesFilter param) {
    var filter = param == null ? NotesFilter.emptyFilter() : param;

    var user = userService.currentUser();
    return noteService.findBy(filter.getBookId(), filter.getUserId(), filter.getSearchTerm())
        .stream()
        .map(note -> noteMapper.mapNote(note, deletableBy(note, user)))
        .collect(Collectors.toList());
  }

  @GraphQLMutation(description = "Deletes a note identified by the given parameter.")
  public boolean deleteNote(@NotNull DeleteNote param) {
    return noteService.deleteNote(param.getNoteId());
  }

  @GraphQLMutation(description = "Adds a note with the given title/content to the given book.")
  public NoteDto addNote(@NotNull AddNote param) {
    var user = userService.currentUser();
    var note = noteService.addNote(param.getBookTitle(), param.getNoteTitle(), param.getContent());
    return noteMapper.mapNote(note, deletableBy(note, user));
  }

  private static boolean deletableBy(Note note, User user) {
    return note.getCreatedBy().getId().equals(user.getId());
  }
}
