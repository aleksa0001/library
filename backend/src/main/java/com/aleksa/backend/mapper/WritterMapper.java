package com.aleksa.backend.mapper;

import com.aleksa.backend.dto.writter.BasicWritterDto;
import com.aleksa.backend.dto.writter.CreateWritterDto;
import com.aleksa.backend.dto.writter.UpdateWritterDto;
import com.aleksa.backend.dto.writter.WritterDto;
import com.aleksa.backend.entity.Writter;

import java.util.ArrayList;

public class WritterMapper {
    public Writter mapCreateDtoToEntity(CreateWritterDto createWritterDto) {
        return new Writter(null, createWritterDto.getFullName(), createWritterDto.getBirthday(), createWritterDto.getImage(), new ArrayList<>());
    }

    public WritterDto mapEntityToDto(Writter writter) {
        return new WritterDto(writter.getId(), writter.getFullName(), writter.getBirthday(), writter.getImage(), new ArrayList<>());
    }

    public void updateEntity(Writter actor, UpdateWritterDto updateWritterDto) {
        if (updateWritterDto.getFullName() != null) {
            actor.setFullName(updateWritterDto.getFullName());
        }
        if (updateWritterDto.getBirthday() != null) {
            actor.setBirthday(updateWritterDto.getBirthday());
        }
        if (updateWritterDto.getImage() != null) {
            actor.setImage(updateWritterDto.getImage());
        }
    }


    public BasicWritterDto mapEntityToBasicDto(Writter writter) {
        return new BasicWritterDto(writter.getId(), writter.getFullName(), writter.getBirthday(), writter.getImage());

    }

    public Writter mapBasicDtoToEntity(BasicWritterDto basicWritterDto) {
        return new Writter(basicWritterDto.getId(), basicWritterDto.getFullName(), basicWritterDto.getBirthday(), basicWritterDto.getImage(), new ArrayList<>());
    }
}
