package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.Zvanje;

@Repository
public interface ZvanjeRepository extends CrudRepository<Zvanje, Long>{

}
