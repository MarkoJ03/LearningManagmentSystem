package server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import server.model.RealizacijaPredmeta;

@Repository
public interface RealizacijaPredmetaRepository extends CrudRepository<RealizacijaPredmeta, Long>, PagingAndSortingRepository<RealizacijaPredmeta, Long>{

	@Query("SELECT rp FROM RealizacijaPredmeta rp JOIN FETCH rp.tipNastave tn JOIN FETCH rp.predmeti prp JOIN FETCH prp.predmet p WHERE rp.id = :id")
	RealizacijaPredmeta findWithDetailsById(@Param("id") Long id);

}
