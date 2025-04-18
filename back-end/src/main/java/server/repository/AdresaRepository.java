package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.Adresa;

@Repository
public interface AdresaRepository extends CrudRepository<Adresa, Long>{

}
