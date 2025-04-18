package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.DepartmanNastavnik;

@Repository
public interface DepartmanNastavnikRepository extends CrudRepository<DepartmanNastavnik, Long> {

}
