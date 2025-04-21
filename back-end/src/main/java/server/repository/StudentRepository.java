package server.repository;

import org.springframework.data.repository.CrudRepository;

import server.model.Student;

public interface StudentRepository extends CrudRepository<Student, Long>{

}
