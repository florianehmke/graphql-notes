package com.github.florianehmke.graphqlnotes.persistence.model;

import io.leangen.graphql.annotations.GraphQLQuery;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
public class Author extends BaseEntity {

  @GraphQLQuery private String firstName;

  @GraphQLQuery private String lastName;
}
