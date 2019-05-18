package com.github.florianehmke.graphqlnotes.persistence.repository;

import com.github.florianehmke.graphqlnotes.persistence.model.Book_;
import com.github.florianehmke.graphqlnotes.persistence.model.User_;
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

  public static Specification<Note> searchBy(Long bookId, Long userId, String searchTerm) {
    return (note, cq, cb) -> {
      var predicates = new ArrayList<Predicate>();
      if (!isNullOrEmpty(searchTerm)) {
        var search = '%' + searchTerm.toLowerCase() + '%';
        var title = cb.like(cb.lower(note.get(NOTE_TITLE)), search);
        var content = cb.like(cb.lower(note.get(NOTE_CONTENT)), search);
        predicates.add(cb.or(title, content));
      }
      if (userId != null) {
        predicates.add(cb.equal(note.join(Note_.CREATED_BY).get(User_.ID), userId));
      }
      if (bookId != null) {
        predicates.add(cb.equal(note.join(Note_.BOOK).get(Book_.ID), bookId));
      }
      return andTogether(predicates, cb);
    };
  }

  private static Predicate andTogether(List<Predicate> predicates, CriteriaBuilder cb) {
    return cb.and(predicates.toArray(new Predicate[0]));
  }
}
