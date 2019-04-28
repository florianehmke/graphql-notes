package com.github.florianehmke.graphqlshopping.persistence.repository;

import com.github.florianehmke.graphqlshopping.persistence.model.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
    Collection<Entry> findByAuthorId(Long authorId);
}
