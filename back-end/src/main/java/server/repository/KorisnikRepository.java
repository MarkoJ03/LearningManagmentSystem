package server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.Korisnik;

@Repository
public interface KorisnikRepository extends PagingAndSortingRepository<Korisnik, Long>, JpaRepository<Korisnik, Long> {
	Optional<Korisnik> findByEmailAndLozinka(String email, String lozinka);
	Optional<Korisnik> findByEmail(String email);
}
