package com.aleksa.backend.repository;

import com.aleksa.backend.entity.Writter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WritterRepository extends JpaRepository<Writter,Long> {

}
