package com.github.florianehmke.graphqlnotes.persistence.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@Setter
@Getter
public class Note extends BaseEntity {

  private String noteTitle;
  private String noteContent;
  @ManyToOne private Book book;
  @ManyToOne private User createdBy;
}
