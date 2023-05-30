package com.digital.api.digital_booking.services;

import com.digital.api.digital_booking.exceptions.BadRequestException;
import com.digital.api.digital_booking.exceptions.CategoryNotFoundException;
import com.digital.api.digital_booking.models.Category;
import com.digital.api.digital_booking.models.PageResponse;
import com.digital.api.digital_booking.models.Product;
import com.digital.api.digital_booking.repositories.ICategoryRepository;
import com.digital.api.digital_booking.repositories.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    IProductRepository productRepository;
    @Autowired
    ICategoryRepository categoryRepository;

    public Product createProduct(Product product) {
        System.out.println("product: " + product);
        if (productRepository.findByNameProduct(product.getNameProduct()) != null) {            //return status 400 bad request
            throw new BadRequestException("El producto ya existe.");

        } else {
            System.out.println("product: " + product);
            Category category = categoryRepository.findByIdCategory(product.getCategory().getIdCategory());
            System.out.println("category: " + category);
            if (category == null) {
                throw new CategoryNotFoundException("La categoría no existe.");
            }

            product.setCategory(category);
            return productRepository.save(product);
        }

    }
    public PageResponse<Product> getAll(int pageNumber, int pageSize, String sortField, String sortOrder, Long categoryId) {
        // Definir opciones de ordenación si es necesario
        Sort sort = Sort.by(sortField);
        if ("desc".equals(sortOrder)) {
            sort = sort.descending();
        } else {
            sort = sort.ascending();
        }

        // Crear un objeto PageRequest con el tamaño de página, el número de página y las opciones de ordenación
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, sort);

        // Ejecutar la consulta paginada utilizando el método findAll() de Spring Data JPA y el objeto PageRequest
        Page<Product> productPage;

        if (categoryId != null) {
            // Filtrar por categoría si se proporciona un ID de categoría válido
            productPage = productRepository.findByCategory_IdCategory(categoryId, pageRequest);
        } else {
            productPage = productRepository.findAll(pageRequest);
        }

        // Obtener la lista de productos del objeto Page
        List<Product> products = productPage.getContent();

        // Devolver el objeto PageResponse
        return new PageResponse<Product>(
                productPage.getTotalElements(),
                productPage.getTotalPages(),
                productPage.getNumber(),
                productPage.getSize(),
                products
        );
    }


    public boolean deleteProduct(Long id) {
        try {
            productRepository.deleteById(id);
            return true;
        } catch (Exception err) {
            return false;
        }
    }
    public Product getProductById(Long id) {
        return productRepository.findById(id).get();
    }

    public Product updateProductById(Long id, Product product) {
        Product existingProduct = productRepository.findById(id).get();
        existingProduct.setNameProduct(product.getNameProduct());
        existingProduct.setDescriptionProduct(product.getDescriptionProduct());
        existingProduct.setImage(product.getImage());

        return productRepository.save(existingProduct);
    }

    public List<Product> getAllProductsRandom() {
        List<Product> products = productRepository.findAll();
        Collections.shuffle(products);
        return products;
    }

}
