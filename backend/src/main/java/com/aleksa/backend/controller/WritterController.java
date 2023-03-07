package com.aleksa.backend.controller;

import com.aleksa.backend.dto.writter.CreateWritterDto;
import com.aleksa.backend.dto.writter.UpdateWritterDto;
import com.aleksa.backend.dto.writter.WritterDto;
import com.aleksa.backend.service.WritterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "writters")
@RequiredArgsConstructor
public class WritterController {
    private final WritterService writterService;


    @GetMapping(value = "/{id}")
    WritterDto getWritter(@PathVariable(name = "id") Long id) {
        return writterService.getWritter(id);
    }


    @GetMapping
    List<WritterDto> getWritters() {
        return writterService.getWritters();
    }


    @PostMapping
    WritterDto addWritter(@RequestBody CreateWritterDto createWritterDto) {
        return writterService.createWritter(createWritterDto);
    }

    @PutMapping(value = "/{id}")
    WritterDto updateWritter(@RequestBody UpdateWritterDto updateWritterDto, @PathVariable Long id) {
        return writterService.updateWritter(updateWritterDto, id);
    }


    @DeleteMapping(value = "/{id}")
    void deleteWritter(@PathVariable Long id) {
        writterService.deleteWritter(id);
    }
}