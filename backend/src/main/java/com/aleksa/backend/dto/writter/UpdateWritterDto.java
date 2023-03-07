package com.aleksa.backend.dto.writter;

import com.aleksa.backend.dto.book.BasicBookDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UpdateWritterDto {
    private String fullName;
    private LocalDate birthday;
    private String image;
    private List<BasicBookDto> books;
}