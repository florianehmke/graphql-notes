package com.github.florianehmke.graphqlnotes.graphql.parameters;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddNote {
    private String bookTitle;
    private String noteTitle;
    private String content;
}
