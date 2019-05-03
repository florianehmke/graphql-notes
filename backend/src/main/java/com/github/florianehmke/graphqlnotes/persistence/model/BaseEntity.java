package com.github.florianehmke.graphqlnotes.persistence.model;

import io.leangen.graphql.annotations.GraphQLIgnore;
import io.leangen.graphql.annotations.GraphQLQuery;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@Getter
@Setter
@MappedSuperclass
public abstract class BaseEntity implements Serializable {

  @GraphQLQuery @Id @GeneratedValue private Long id;

  @GraphQLIgnore
  public boolean isTransient() {
    return this.id == null;
  }
}
