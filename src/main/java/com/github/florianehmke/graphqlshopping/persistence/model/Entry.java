package com.github.florianehmke.graphqlshopping.persistence.model;

import com.github.florianehmke.graphqlshopping.persistence.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
public class Entry extends BaseEntity {

  private String name;
  private String secretNote;
}
