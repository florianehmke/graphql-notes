package com.github.florianehmke.graphqlnotes.persistence.repository;

import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import com.github.florianehmke.graphqlnotes.persistence.model.Note_;
import org.springframework.data.jpa.domain.Specification;

import static com.google.common.base.Strings.isNullOrEmpty;

public class NoteSpecifications {

  static Specification<Note> contains(String search) {
    return !isNullOrEmpty(search) ? containsTitle(search).or(containsContent(search)) : null;
  }

  static Specification<Note> containsTitle(String search) {
    return (note, cq, cb) -> cb.like(note.get(Note_.NOTE_TITLE), '%' + search + '%');
  }

  static Specification<Note> containsContent(String search) {
    return (note, cq, cb) -> cb.like(note.get(Note_.NOTE_CONTENT), '%' + search + '%');
  }

  static Specification<Note> hasAuthorId(Long authorId) {
    return (note, cq, cb) -> cb.equal(note.join(Note_.AUTHOR).get("id"), authorId);
  }
}
