package com.github.florianehmke.graphqlnotes.service;

import com.github.florianehmke.graphqlnotes.persistence.model.Book;
import com.github.florianehmke.graphqlnotes.persistence.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

  private BookRepository bookRepository;
  private UserService userService;

  @Autowired
  public BookService(BookRepository bookRepository, UserService userService) {
    this.bookRepository = bookRepository;
    this.userService = userService;
  }

  public Book getByTitle(String bookTitle) {
    return this.bookRepository
        .findByBookTitle(bookTitle)
        .orElseGet(
            () -> {
              var book = new Book();
              book.setCreatedBy(userService.currentUser());
              book.setBookTitle(bookTitle);
              return bookRepository.save(book);
            });
  }

  public void removeBook(Book book) {
      bookRepository.delete(book);
  }
}
