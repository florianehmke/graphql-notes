package com.github.florianehmke.graphqlnotes.persistence.model;

import com.github.florianehmke.graphqlnotes.persistence.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
public class Note extends BaseEntity {

  private String name;
  private String description;

  @ManyToOne private Author author;
}
