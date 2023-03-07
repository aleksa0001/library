package com.aleksa.backend.service;

import com.aleksa.backend.dto.writter.CreateWritterDto;
import com.aleksa.backend.dto.writter.UpdateWritterDto;
import com.aleksa.backend.dto.writter.WritterDto;

import java.util.List;

public interface WritterService {
    WritterDto getWritter(Long id);

    List<WritterDto> getWritters();

    WritterDto createWritter(CreateWritterDto createWritterDto);

    WritterDto updateWritter(UpdateWritterDto updateWritterDto, Long id);

    void deleteWritter(Long id);
}
