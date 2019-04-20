package com.github.florianehmke.graphqlshopping.persistence.repository;

import com.github.florianehmke.graphqlshopping.persistence.model.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {}
