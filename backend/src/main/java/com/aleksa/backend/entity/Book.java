package com.aleksa.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "\"book\"")
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "image", nullable = false)
    private String image;
    @Column(name = "description", nullable = false, length = 500)
    private String description;
    @Column(name = "date_of_creating", nullable = false)
    private LocalDate dateOfCreation;
    @ElementCollection
    @CollectionTable(name = "book_genre", joinColumns = @JoinColumn(name = "book_id"))
    @Enumerated(EnumType.STRING)
    private List<Genre> genres;
    @ManyToMany
    @JoinTable(name = "book_roles",
            joinColumns = {@JoinColumn(name = "book_id")},
            inverseJoinColumns = {@JoinColumn(name = "writter_id")})
    private List<Writter> writters;


    public void addWritter(Writter writter) {
        writters.add(writter);
        writter.getBooks().add(this);
    }

    public void deleteWritter(Writter writter) {
        writters.remove(writter);
        writter.getBooks().remove(this);
    }

}