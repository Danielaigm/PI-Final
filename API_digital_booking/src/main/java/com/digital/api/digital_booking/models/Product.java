package com.digital.api.digital_booking.models;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.web.bind.annotation.CrossOrigin;

@Entity // this is a table spring boot will create
@Table(name = "product") // this is the name of the table
@Data // all methods are getters and setters
public class Product {
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)// auto increment
    @Column(unique = true, nullable = false)
    private Long idProduct;

    @Column(unique = true)
    private String nameProduct;

    @Column(columnDefinition = "LONGTEXT")
    private String descriptionProduct;
    private String image;

    
    @ManyToOne
    @JoinColumn(name = "idCategory")
    private Category category;
    private String duration;


}
