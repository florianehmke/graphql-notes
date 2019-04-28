package com.github.florianehmke.graphqlnotes.persistence;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

  @Id @GeneratedValue private Long id;

  @JsonIgnore
  public boolean isTransient() {
    return this.id == null;
  }
}
