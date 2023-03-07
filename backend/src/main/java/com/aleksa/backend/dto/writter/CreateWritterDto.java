package com.aleksa.backend.dto.writter;

import com.aleksa.backend.dto.book.BasicBookDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CreateWritterDto {
    @NotNull
    private String fullName;
    @NotNull
    private LocalDate birthday;
    @NotNull
    private String image;
    @NotNull
    private List<BasicBookDto> books;
}