package com.aleksa.backend.mapper;

import com.aleksa.backend.dto.book.BasicBookDto;
import com.aleksa.backend.dto.book.BookDto;
import com.aleksa.backend.dto.book.CreateBookDto;
import com.aleksa.backend.dto.book.UpdateBookDto;
import com.aleksa.backend.entity.Book;

import java.util.ArrayList;
import java.util.Objects;

public class BookMapper {
    public Book mapCreateDtoToEntity(CreateBookDto createBookDto) {
        return new Book(null, createBookDto.getTitle(), createBookDto.getImage(), createBookDto.getDescription(), createBookDto.getDateOfCreation(), createBookDto.getGenres(), new ArrayList<>());
    }

    public BookDto mapEntityToDto(Book book) {
        return new BookDto(book.getId(), book.getTitle(), book.getImage(), book.getDescription(), book.getDateOfCreation(), book.getGenres(), new ArrayList<>());
    }

    public void updateEntity(Book book, UpdateBookDto updateBookDto) {
        if (Objects.nonNull(updateBookDto.getTitle()))
            book.setTitle(updateBookDto.getTitle());

        if (Objects.nonNull(updateBookDto.getImage()))
            book.setImage(updateBookDto.getImage());

        if (Objects.nonNull(updateBookDto.getDescription()))
            book.setDescription(updateBookDto.getDescription());

        if (Objects.nonNull(updateBookDto.getDateOfCreation()))
            book.setDateOfCreation(updateBookDto.getDateOfCreation());

        if (Objects.nonNull(updateBookDto.getGenres()))
            book.setGenres(updateBookDto.getGenres());
    }

    public Book mapBasicDtoToEntity(BasicBookDto basicBookDto) {
        return new Book(basicBookDto.getId(), basicBookDto.getTitle(), basicBookDto.getImage(), basicBookDto.getDescription(),   basicBookDto.getDateOfCreation(), basicBookDto  .getGenres(), new ArrayList<>());
    }

    public BasicBookDto mapEntityToBasicDto(Book book) {
        return new BasicBookDto(book.getId(), book.getTitle(), book.getImage(), book.getDescription(), book.getDateOfCreation(), book.getGenres());
    }
}
