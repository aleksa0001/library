package com.aleksa.backend.service.impl;

import com.aleksa.backend.dto.writter.CreateWritterDto;
import com.aleksa.backend.dto.writter.UpdateWritterDto;
import com.aleksa.backend.dto.writter.WritterDto;
import com.aleksa.backend.entity.Writter;
import com.aleksa.backend.exception.NotFoundException;
import com.aleksa.backend.mapper.BookMapper;
import com.aleksa.backend.mapper.WritterMapper;
import com.aleksa.backend.repository.BookRepository;
import com.aleksa.backend.repository.WritterRepository;
import com.aleksa.backend.service.WritterService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WritterServiceImpl implements WritterService {
    private final String WRITTER_NOT_FOUND = "Writter not found!";
    private final String BOOK_NOT_FOUND = "Movie not found!";
    private static final String INVALID_PAGE_NUMBER = "Invalid page number!";
    private static final String INVALID_PAGE_SIZE = "Invalid page size!";
    private final WritterRepository writterRepository;
    private final BookRepository bookRepository;
    private final WritterMapper writterMapper;
    private final BookMapper bookMapper;

    @Override
    public WritterDto getWritter(Long id) {
        Writter writter = writterRepository.findById(id).orElseThrow(() -> new NotFoundException(WRITTER_NOT_FOUND));
        WritterDto writterDto = writterMapper.mapEntityToDto(writter);
        writterDto.setBooks(writter.getBooks().stream().map(bookMapper::mapEntityToBasicDto).collect(Collectors.toList()));
        return writterDto;
    }

    @Override
    public List<WritterDto> getWritters() {
        return writterRepository.findAll().stream().map(writter -> {
            WritterDto writterDto = writterMapper.mapEntityToDto(writter);
            writterDto.setBooks(writter.getBooks().stream().map(bookMapper::mapEntityToBasicDto).collect(Collectors.toList()));
            return writterDto;
        }).collect(Collectors.toList());
    }


    @Override
    @Transactional
    public WritterDto createWritter(CreateWritterDto createWritterDto) {
        Writter writter = writterMapper.mapCreateDtoToEntity(createWritterDto);
        Writter finalWritter = writter;
        createWritterDto.getBooks().forEach(book -> finalWritter.addBook(bookRepository.findById(book.getId()).orElseThrow(() -> new NotFoundException(BOOK_NOT_FOUND))));
        writter = writterRepository.save(finalWritter);
        WritterDto writterDto = writterMapper.mapEntityToDto(writter);
        writterDto.setBooks(writter.getBooks().stream().map(bookMapper::mapEntityToBasicDto).collect(Collectors.toList()));
        return writterDto;
    }

    @Override
    @Transactional
    public WritterDto updateWritter(UpdateWritterDto updateWritterDto, Long id) {
        Writter writter = writterRepository.findById(id).orElseThrow(() -> new NotFoundException(WRITTER_NOT_FOUND));
        writterMapper.updateEntity(writter, updateWritterDto);
        Writter finalWritter = writter;
        if (Objects.nonNull(updateWritterDto.getBooks())) {
            updateWritterDto.getBooks().forEach(book -> {
                if (finalWritter.getBooks().stream().noneMatch(m -> book.getId().equals(m.getId()))) {
                    finalWritter.addBook(bookRepository.findById(book.getId()).orElseThrow(() -> new NotFoundException(BOOK_NOT_FOUND)));
                }
            });

            int i;
            for (i = 0; i < finalWritter.getBooks().size(); i++) {
                int x = i;
                if (updateWritterDto.getBooks().stream().noneMatch(m -> (m.getId().equals(finalWritter.getBooks().get(x).getId())))) {
                    finalWritter.deleteBook(finalWritter.getBooks().get(x));
                }
            }
        }
        writter = writterRepository.save(finalWritter);
        WritterDto writterDto = writterMapper.mapEntityToDto(writter);
        writterDto.setBooks(writter.getBooks().stream().map(bookMapper::mapEntityToBasicDto).collect(Collectors.toList()));
        return writterDto;
    }

    @Override
    public void deleteWritter(Long id) {
        writterRepository.findById(id).ifPresentOrElse((writter) -> {
            while (writter.getBooks().size() != 0) writter.getBooks().get(0).deleteWritter(writter);
            bookRepository.deleteById(id);
        }, () -> {
            throw new NotFoundException(WRITTER_NOT_FOUND);
        });
    }

}