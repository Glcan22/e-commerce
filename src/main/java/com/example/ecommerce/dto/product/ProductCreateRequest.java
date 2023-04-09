package com.example.ecommerce.dto.product;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductCreateRequest {
    @NotNull
    @NotBlank(message = "Product name cannot be empty")
    @Size(min=2, max = 50, message = "Product Name long cannot over 300 characters long")
    private String productName;

    @NotNull
    @NotBlank(message = "Description cannot be empty")
    @Size( max = 1500, message = "Description long cannot over 300 characters long")
    @Lob
    private String description;

    @NotNull
    @NotBlank(message = "Author name cannot be empty")
    @Size(min=2, max = 50, message = "Product Name long cannot over 300 characters long")
    private String authorName;

    @NotNull
    @DecimalMin(value="0.0",inclusive = false,message="Please enter a valid value")
    private Double price;

    @NotNull
    private Integer numberOfPages;

    private String publisher;
    private String language;
    private long stock;
    private String ISBN;
    private String imageUrl;
    private int publishedDate;

}