package com.github.florianehmke.graphqlnotes.service;

import com.github.florianehmke.graphqlnotes.graphql.ClientException;
import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import com.github.florianehmke.graphqlnotes.persistence.model.User;
import com.github.florianehmke.graphqlnotes.persistence.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

import static com.github.florianehmke.graphqlnotes.persistence.repository.NoteSpecifications.searchBy;

@Service
public class NoteService {

  private NoteRepository noteRepository;
  private BookService bookService;
  private UserService userService;
  private NotificationService notificationService;

  @Autowired
  public NoteService(
      NoteRepository noteRepository,
      BookService bookService,
      UserService userService,
      NotificationService notificationService) {
    this.noteRepository = noteRepository;
    this.bookService = bookService;
    this.userService = userService;
    this.notificationService = notificationService;
  }

  public Collection<Note> findBy(Long bookId, Long userId, String searchTerm) {
    return noteRepository.findAll(searchBy(bookId, userId, searchTerm));
  }

  public boolean deleteNote(Long noteId) {
    var note =
        noteRepository
            .findById(noteId)
            .orElseThrow(() -> new ClientException("not_found", "Note does not exist!"));

    var book = note.getBook();
    noteRepository.delete(note);
    var bookNoteCount = noteRepository.countByBookId(book.getId());
    if (bookNoteCount == 0L) {
      bookService.removeBook(book);
    }

    String notification = String.format("Note with id %d was deleted.", noteId);
    notificationService.notify("Note deleted!", notification);

    return true;
  }

  public Note addNote(String bookTitle, String title, String content) {
    if (title.contains("error")) {
      throw new ClientException("Error", "Dude! Title must not contain Error!");
    }

    var book = bookService.getByTitle(bookTitle);
    var user = userService.currentUser();

    var note = new Note();
    note.setBook(book);
    note.setCreatedBy(user);
    note.setNoteTitle(title);
    note.setNoteContent(content);
    var savedNote = noteRepository.save(note);

    var notification = String.format("Note with id %d was created.", savedNote.getId());
    notificationService.notify("Note created!", notification);

    return savedNote;
  }

  public Long countByCreatedBy(User createdBy) {
    return noteRepository.countByCreatedById(createdBy.getId());
  }
}
