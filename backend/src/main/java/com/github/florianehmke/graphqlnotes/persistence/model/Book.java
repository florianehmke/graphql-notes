package com.github.florianehmke.graphqlnotes.persistence.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@Setter
@Getter
public class Book extends BaseEntity {

  private String bookTitle;
  @ManyToOne private User createdBy;
}
