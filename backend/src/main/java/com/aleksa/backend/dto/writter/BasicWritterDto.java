package com.aleksa.backend.dto.writter;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class BasicWritterDto {
    private Long id;
    private String fullName;
    private LocalDate birthday;
    private String image;
}