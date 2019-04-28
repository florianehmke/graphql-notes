package com.github.florianehmke.graphqlnotes.persistence.model;

import io.leangen.graphql.annotations.GraphQLQuery;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
public class Note extends BaseEntity {

  @GraphQLQuery
  private String noteTitle;

  @GraphQLQuery
  private String noteContent;

  @GraphQLQuery
  @ManyToOne
  private Author author;
}
