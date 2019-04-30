package com.github.florianehmke.graphqlnotes.persistence.repository;

import com.github.florianehmke.graphqlnotes.persistence.model.Author_;
import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import com.github.florianehmke.graphqlnotes.persistence.model.Note_;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

import static com.github.florianehmke.graphqlnotes.persistence.model.Note_.NOTE_CONTENT;
import static com.github.florianehmke.graphqlnotes.persistence.model.Note_.NOTE_TITLE;
import static com.google.common.base.Strings.isNullOrEmpty;

public class NoteSpecifications {

  public static Specification<Note> searchBy(Long authorId, String search) {
    return (note, cq, cb) -> {
      var predicates = new ArrayList<Predicate>();
      if (!isNullOrEmpty(search)) {
        Predicate title = cb.like(note.get(NOTE_TITLE), '%' + search + '%');
        Predicate content = cb.like(note.get(NOTE_CONTENT), '%' + search + '%');
        predicates.add(cb.or(title, content));
      }
      if (authorId != null) {
        predicates.add(cb.equal(note.join(Note_.AUTHOR).get(Author_.ID), authorId));
      }
      return andTogether(predicates, cb);
    };
  }

  private static Predicate andTogether(List<Predicate> predicates, CriteriaBuilder cb) {
    return cb.and(predicates.toArray(new Predicate[0]));
  }
}
