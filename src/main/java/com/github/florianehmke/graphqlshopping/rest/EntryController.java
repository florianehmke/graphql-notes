package com.github.florianehmke.graphqlshopping.rest;

import com.github.florianehmke.graphqlshopping.persistence.model.Entry;
import com.github.florianehmke.graphqlshopping.persistence.repository.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/entries")
public class EntryController {

  private final EntryRepository repository;

  @Autowired
  public EntryController(EntryRepository repository) {
    this.repository = repository;
  }

  @GetMapping
  public List<Entry> getEntries() {
    return this.repository.findAll();
  }
}
