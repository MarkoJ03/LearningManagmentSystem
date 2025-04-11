package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.StudentNaGodini;

@Repository
public interface StudentNaGodiniRepository extends CrudRepository<StudentNaGodini, Long> {

}
