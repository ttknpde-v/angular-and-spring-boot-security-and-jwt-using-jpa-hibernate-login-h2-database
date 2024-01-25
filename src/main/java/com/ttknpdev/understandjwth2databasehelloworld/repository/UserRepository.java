package com.ttknpdev.understandjwth2databasehelloworld.repository;

import com.ttknpdev.understandjwth2databasehelloworld.entities.User;
import org.springframework.data.repository.CrudRepository;

// use passed @service So it do not need to use @Repository
public interface UserRepository extends CrudRepository<User,Long> {
    User findByUsername(String username);
}
