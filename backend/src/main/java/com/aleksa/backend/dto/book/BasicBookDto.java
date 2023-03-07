package com.aleksa.backend.dto.book;

import com.aleksa.backend.entity.Genre;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class BasicBookDto {
    private Long id;
    private String title;
    private String image;
    private String description;
    private LocalDate dateOfCreation;
    private List<Genre> genres;
}
