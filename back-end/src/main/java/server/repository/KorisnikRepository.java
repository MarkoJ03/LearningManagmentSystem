package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.Korisnik;

@Repository
public interface KorisnikRepository extends CrudRepository<Korisnik, Long> {

}
