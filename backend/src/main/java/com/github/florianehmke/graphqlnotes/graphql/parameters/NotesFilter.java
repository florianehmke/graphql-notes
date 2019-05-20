package com.github.florianehmke.graphqlnotes.graphql.parameters;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotesFilter {
    private Long bookId;
    private Long userId;
    private String searchTerm;

    public static NotesFilter emptyFilter() {
        return new NotesFilter();
    }
}
