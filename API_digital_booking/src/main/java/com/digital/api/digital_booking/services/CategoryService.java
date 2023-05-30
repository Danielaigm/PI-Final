package com.digital.api.digital_booking.services;

import com.digital.api.digital_booking.models.Category;
import com.digital.api.digital_booking.repositories.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    public Category createCategory(Category category){
        return categoryRepository.save(category);
    }

    public Category updateCategory(Category category){
        return categoryRepository.save(category);
    }

    public Category getCategoryById(Long idCategory){
        return categoryRepository.findByIdCategory(idCategory);
    }

    public void deleteCategory(Long idCategory){
        categoryRepository.deleteById(idCategory);
    }

    public Iterable<Category> getAll(){
        return categoryRepository.findAll();
    }





}
