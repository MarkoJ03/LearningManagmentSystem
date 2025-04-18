package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.Student;

@Repository
public interface StudentRepository extends CrudRepository<Student, Long>{

}
