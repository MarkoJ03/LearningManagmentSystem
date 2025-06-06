package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.Drzava;

@Repository
public interface DrzavaRepository extends CrudRepository<Drzava, Long> {

}
