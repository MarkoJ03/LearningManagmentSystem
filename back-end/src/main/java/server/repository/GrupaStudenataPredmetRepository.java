package server.repository;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import server.model.GrupaStudenataPredmet;

@Repository
public interface GrupaStudenataPredmetRepository extends CrudRepository<GrupaStudenataPredmet, Long>, PagingAndSortingRepository<GrupaStudenataPredmet, Long> {
	
	@Query("SELECT gsp.grupaStudenata.id FROM GrupaStudenataPredmet gsp " +
	           "WHERE gsp.predmet.id = :predmetId AND gsp.vidljiv = true")
	    List<Long> findGrupaIdsByPredmetId(@Param("predmetId") Long predmetId);
}
