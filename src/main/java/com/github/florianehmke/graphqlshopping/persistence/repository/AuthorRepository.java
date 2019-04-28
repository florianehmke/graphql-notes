package com.github.florianehmke.graphqlshopping.persistence.repository;

import com.github.florianehmke.graphqlshopping.persistence.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {}
