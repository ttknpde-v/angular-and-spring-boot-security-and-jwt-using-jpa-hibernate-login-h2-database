package com.ttknpdev.understandjwth2databasehelloworld.repository;

import com.ttknpdev.understandjwth2databasehelloworld.entities.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book,String> { }
