package com.github.florianehmke.graphqlnotes.graphql;

import com.github.florianehmke.graphqlnotes.configuration.Role;
import com.github.florianehmke.graphqlnotes.persistence.model.Book;
import com.github.florianehmke.graphqlnotes.service.BookService;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.annotation.security.RolesAllowed;
import java.util.Collection;

@Controller
@GraphQLApi
@RolesAllowed(Role.USER)
public class BookController {

  private BookService bookService;

  @Autowired
  public BookController(BookService bookService) {
    this.bookService = bookService;
  }

  @GraphQLQuery(description = "Loads all books.")
  public Collection<Book> books() {
    return bookService.findAll();
  }
}
