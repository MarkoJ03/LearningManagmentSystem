package server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import server.model.Kalendar;

public interface KalendarRepository extends CrudRepository<Kalendar, Long>, PagingAndSortingRepository<Kalendar, Long>{
	
	@Query("SELECT k FROM Kalendar k JOIN k.terminiNastave tn JOIN tn.realizacijaPredmeta rp JOIN rp.nastavnici n WHERE n.id = :nastavnikId AND k.vidljiv = true")
	Kalendar findKalendarByNastavnikId(@Param("nastavnikId") Long nastavnikId);
	
}
