package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.StudentNaGodini;

@Repository
public interface StudentNaGodiniRepository extends CrudRepository<StudentNaGodini, Long>, PagingAndSortingRepository<StudentNaGodini, Long> {

}
