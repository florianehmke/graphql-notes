package com.github.florianehmke.graphqlnotes.persistence.repository;

import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Collection;

import static com.github.florianehmke.graphqlnotes.persistence.repository.NoteSpecifications.contains;
import static com.github.florianehmke.graphqlnotes.persistence.repository.NoteSpecifications.hasAuthorId;
import static org.springframework.data.jpa.domain.Specification.where;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long>, JpaSpecificationExecutor<Note> {
  Collection<Note> findByAuthorId(Long authorId);

  Long countByAuthorId(Long authorId);

  default Collection<Note> searchBy(Long authorId, String search) {
    return findAll(where(hasAuthorId(authorId).and(contains(search))));
  }
}
