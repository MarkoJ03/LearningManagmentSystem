package server.repository;

import org.springframework.data.repository.CrudRepository;

import server.model.Korisnik;

public interface KorisnikRepository extends CrudRepository<Korisnik, Long> {

}
