package com.digital.api.digital_booking.controllers;

import com.digital.api.digital_booking.models.Category;
import com.digital.api.digital_booking.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/category", produces = "application/json")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;


    @GetMapping(path = "/getAll", produces = "application/json" )
    @ResponseBody
    public Iterable<Category> getAllCategories() {
        return categoryService.getAll();
    }

    @PostMapping("/create")
    public Category createCategory(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @PutMapping("/update")
    public Category updateCategory(@RequestBody Category category) {
        return categoryService.updateCategory(category);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCategory(@PathVariable("id") Long id) {
        System.out.println("id: " + id);
        categoryService.deleteCategory(id);
        return "Category with id " + id + " deleted";
    }

    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable("id") Long id) {
        return categoryService.getCategoryById(id);
    }



}
