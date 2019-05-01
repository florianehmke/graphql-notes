package com.github.florianehmke.graphqlnotes.controller;

import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.language.SourceLocation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ClientException extends RuntimeException implements GraphQLError {

    private Map<String, Object> extensions = new HashMap<>();

    public ClientException(String code, String message) {
        super(message);
        extensions.put("code", code);
        extensions.put("message", message);
    }

    @Override
    public List<SourceLocation> getLocations() {
        // No location - client error.
        return null;
    }

    @Override
    public ErrorType getErrorType() {
        // No ErrorType.
        return null;
    }

    @Override
    public Map<String, Object> getExtensions() {
        return extensions;
    }
}
