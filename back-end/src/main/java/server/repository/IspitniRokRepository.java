package server.repository;

import java.time.LocalDate;

import org.springframework.data.repository.CrudRepository;

import server.model.IspitniRok;

public interface IspitniRokRepository extends CrudRepository<IspitniRok, Long>{

	boolean existsByDatumPocetkaLessThanEqualAndDatumZavrsetkaGreaterThanEqual(LocalDate pocetak, LocalDate kraj);

}
