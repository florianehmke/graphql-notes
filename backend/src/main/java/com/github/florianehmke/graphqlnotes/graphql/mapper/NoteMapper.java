package com.github.florianehmke.graphqlnotes.graphql.mapper;

import com.github.florianehmke.graphqlnotes.graphql.dto.NoteDto;
import com.github.florianehmke.graphqlnotes.persistence.model.Note;
import org.mapstruct.Mapper;

@Mapper
public interface NoteMapper {

    NoteDto mapNote(Note note, boolean deletable);
}
