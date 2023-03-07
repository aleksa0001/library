package com.aleksa.backend.dto.book;

import com.aleksa.backend.dto.writter.BasicWritterDto;
import com.aleksa.backend.entity.Genre;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CreateBookDto {
    @NotNull
    private String title;
    @NotNull
    private String image;
    @NotNull
    private String description;
    @NotNull
    private LocalDate dateOfCreation;
    @NotNull
    private List<Genre> genres;
    private List<BasicWritterDto> writters = new ArrayList(0);
}
