package com.github.florianehmke.graphqlnotes.persistence.repository;

import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long>, JpaSpecificationExecutor<Note> {

  Long countByUserId(Long userId);
}
