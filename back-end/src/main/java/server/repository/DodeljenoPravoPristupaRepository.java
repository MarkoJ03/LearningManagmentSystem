package server.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.DodeljenoPravoPristupa;


@Repository
public interface DodeljenoPravoPristupaRepository extends CrudRepository<DodeljenoPravoPristupa, Long>, PagingAndSortingRepository<DodeljenoPravoPristupa, Long>{
	List<DodeljenoPravoPristupa> findByKorisnikIdAndVidljivTrue(Long korisnikId);
}
