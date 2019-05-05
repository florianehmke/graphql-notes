package com.github.florianehmke.graphqlnotes.persistence.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
public class Author extends BaseEntity {

  private String userId;

  private String firstName;

  private String lastName;
}
