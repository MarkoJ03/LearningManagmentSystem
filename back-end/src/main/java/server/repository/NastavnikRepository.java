package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.Nastavnik;

@Repository
public interface NastavnikRepository extends CrudRepository<Nastavnik, Long>{

}
