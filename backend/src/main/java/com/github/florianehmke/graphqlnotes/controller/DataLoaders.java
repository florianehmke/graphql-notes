package com.github.florianehmke.graphqlnotes.controller;

import com.github.florianehmke.graphqlnotes.persistence.model.User;
import com.github.florianehmke.graphqlnotes.persistence.repository.NoteRepository;
import io.leangen.graphql.spqr.spring.autoconfigure.DataLoaderRegistryFactory;
import org.dataloader.DataLoader;
import org.dataloader.DataLoaderRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import static java.util.concurrent.CompletableFuture.supplyAsync;
import static org.dataloader.DataLoader.newDataLoader;

@Controller
public class DataLoaders implements DataLoaderRegistryFactory {

  private NoteRepository noteRepository;

  @Autowired
  public DataLoaders(NoteRepository noteRepository) {
    this.noteRepository = noteRepository;
  }

  @Override
  public DataLoaderRegistry createDataLoaderRegistry() {
    var registry = new DataLoaderRegistry();
    DataLoader<User, Long> noteCounter =
        newDataLoader(users -> supplyAsync(() -> noteRepository.countByUsers(users)));
    registry.register("noteCount", noteCounter);
    return registry;
  }
}
