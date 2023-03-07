package com.aleksa.backend.controller;

import com.aleksa.backend.dto.book.BookDto;
import com.aleksa.backend.dto.book.CreateBookDto;
import com.aleksa.backend.dto.book.UpdateBookDto;
import com.aleksa.backend.service.BookService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/books")
@AllArgsConstructor
@Slf4j
public class BookController {

    private final BookService bookService;

    @GetMapping
    public List<BookDto> getBooks() {
        return bookService.getBooks();
    }

    @GetMapping(value = "/{id}")
    public BookDto getBook(@PathVariable(name = "id") Long id) {
        log.info("Requested for book with id: " + id);
        return bookService.getBook(id);
    }

    @PostMapping
    public BookDto addBook(@Validated @RequestBody CreateBookDto newBook) {
        log.info("Requested to add book with the following data: " + newBook.toString());
        return bookService.createBook(newBook);
    }

    @PutMapping(value = "/{id}")
    public BookDto updateBook(@RequestBody UpdateBookDto updateBookDto, @PathVariable Long id) {
        log.info("Requested to update book with id: " + id + " and new data is following: " + updateBookDto.toString());
        return bookService.updateBook(updateBookDto, id);
    }


    @DeleteMapping(value = "/{id}")
    public void deleteBook(@PathVariable(name = "id") Long id) {
        bookService.deleteBook(id);
    }
}