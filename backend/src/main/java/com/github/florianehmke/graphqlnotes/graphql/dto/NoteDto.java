package com.github.florianehmke.graphqlnotes.graphql.dto;

import com.github.florianehmke.graphqlnotes.persistence.model.Book;
import com.github.florianehmke.graphqlnotes.persistence.model.User;
import io.leangen.graphql.annotations.types.GraphQLType;
import lombok.Data;

@Data
@GraphQLType(name = "Note")
public class NoteDto {

    private Long id;
    private String noteTitle;
    private String noteContent;
    private Book book;
    private User createdBy;
    private boolean deletable;
}
