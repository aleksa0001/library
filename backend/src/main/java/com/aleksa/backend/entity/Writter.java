package com.aleksa.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity(name = "Writter")
@Table(name = "\"writter\"")
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Writter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "full_name", nullable = false)
    private String fullName;
    @Column(name = "birthday", nullable = false)
    private LocalDate birthday;
    @Column(name = "image")
    private String image;
    @ManyToMany(mappedBy = "writters")
    private List<Book> books;
    public Writter(String fullName, LocalDate birthday, String image) {
        this.fullName = fullName;
        this.birthday = birthday;
        this.image = image;
    }
    public void addBook(Book book){
        books.add(book);
        book.getWritters().add(this);
    }
    public void deleteBook(Book book){
        books.remove(book);
        book.getWritters().remove(this);
    }
}