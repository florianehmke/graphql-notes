package com.github.florianehmke.graphqlnotes.rest;

import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import com.github.florianehmke.graphqlnotes.persistence.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/entries")
public class EntryController {

  private final NoteRepository repository;

  @Autowired
  public EntryController(NoteRepository repository) {
    this.repository = repository;
  }

  @GetMapping
  public List<Note> getEntries() {
    return this.repository.findAll();
  }
}
