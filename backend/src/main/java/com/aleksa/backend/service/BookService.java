package com.aleksa.backend.service;

import com.aleksa.backend.dto.book.BookDto;
import com.aleksa.backend.dto.book.CreateBookDto;
import com.aleksa.backend.dto.book.UpdateBookDto;

import java.util.List;

public interface BookService {
    BookDto getBook(Long id);

    List<BookDto> getBooks();

    BookDto createBook(CreateBookDto newBook);

    BookDto updateBook(UpdateBookDto book, Long id);

    void deleteBook(Long id);
}