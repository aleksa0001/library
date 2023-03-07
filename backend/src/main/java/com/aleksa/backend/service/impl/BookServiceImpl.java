package com.aleksa.backend.service.impl;

import com.aleksa.backend.dto.book.BookDto;
import com.aleksa.backend.dto.book.CreateBookDto;
import com.aleksa.backend.dto.book.UpdateBookDto;
import com.aleksa.backend.entity.Book;
import com.aleksa.backend.exception.BadRequestException;
import com.aleksa.backend.exception.NotFoundException;
import com.aleksa.backend.mapper.BookMapper;
import com.aleksa.backend.mapper.WritterMapper;
import com.aleksa.backend.repository.BookRepository;
import com.aleksa.backend.repository.WritterRepository;
import com.aleksa.backend.service.BookService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private static final String BOOK_NOT_FOUND = "Book not found!";
    private static final String DESCRIPTION_TOO_LONG = "The description you have entered is too long!";
    private static final String WRITTER_NOT_FOUND = "Writter not found!";
    private static final String INVALID_PAGE_NUMBER = "Invalid page number!";
    private static final String INVALID_PAGE_SIZE = "Invalid page size!";
    private final BookRepository bookRepository;
    private final WritterRepository writterRepository;
    private final BookMapper bookMapper;
    private final WritterMapper writterMapper;

    @Override
    public BookDto getBook(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new NotFoundException(BOOK_NOT_FOUND));
        BookDto bookDto = bookMapper.mapEntityToDto(book);
        bookDto.setWritters(book.getWritters().stream().map(writterMapper::mapEntityToBasicDto).collect(Collectors.toList()));
        return bookDto;
    }

    @Override
    public List<BookDto> getBooks() {
        return bookRepository.findAll().stream().map(book -> {
            BookDto bookDto = bookMapper.mapEntityToDto(book);
            bookDto.setWritters(book.getWritters().stream().map(writterMapper::mapEntityToBasicDto).collect(Collectors.toList()));
            return bookDto;
        }).collect(Collectors.toList());
    }



    @Override
    @Transactional
    public BookDto createBook(CreateBookDto createBookDto) {
        if (createBookDto.getDescription().length() > 500) {
            throw new BadRequestException(DESCRIPTION_TOO_LONG);
        }
        Book book = bookMapper.mapCreateDtoToEntity(createBookDto);
        Book finalBook = book;
        createBookDto.getWritters().forEach(writter -> finalBook.addWritter(writterRepository.findById(writter.getId()).orElseThrow(() -> new NotFoundException(WRITTER_NOT_FOUND))));
        book = bookRepository.save(finalBook);
        BookDto bookDto = bookMapper.mapEntityToDto(book);
        bookDto.setWritters(book.getWritters().stream().map(writterMapper::mapEntityToBasicDto).collect(Collectors.toList()));
        return bookDto;

    }

    @Override
    @Transactional
    public BookDto updateBook(UpdateBookDto updateBookDto, Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new NotFoundException(BOOK_NOT_FOUND));
        bookMapper.updateEntity(book, updateBookDto);
        Book finalBook = book;
        if (Objects.nonNull(updateBookDto.getWritters())) {
            updateBookDto.getWritters().forEach(writter -> {
                if (finalBook.getWritters().stream().noneMatch(a -> writter.getId().equals(a.getId()))) {
                    finalBook.addWritter(writterRepository.findById(writter.getId()).orElseThrow(() -> new NotFoundException(WRITTER_NOT_FOUND)));
                }
            });
            int i;
            for (i = 0; i < finalBook.getWritters().size(); i++) {
                int x = i;
                if (updateBookDto.getWritters().stream().noneMatch(m -> (m.getId().equals(finalBook.getWritters().get(x).getId())))) {
                    finalBook.deleteWritter(finalBook.getWritters().get(x));
                }
            }
        }
        book = bookRepository.save(finalBook);
        BookDto bookDto = bookMapper.mapEntityToDto(book);
        bookDto.setWritters(book.getWritters().stream().map(writterMapper::mapEntityToBasicDto).collect(Collectors.toList()));
        return bookDto;
    }





    @Override
    public void deleteBook(Long id) {
        bookRepository.findById(id).ifPresentOrElse((book) -> {
            while (book.getWritters().size() != 0) book.getWritters().get(0).deleteBook(book);
            bookRepository.deleteById(id);
        }, () -> {
            throw new NotFoundException(BOOK_NOT_FOUND);
        });
    }
}
