package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.Katedra;

@Repository
public interface KatedraRepository extends CrudRepository<Katedra, Long>{

}
