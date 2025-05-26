package server.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.GodinaStudijaPredmet;

@Repository
public interface GodinaStudijaPredmetRepository extends CrudRepository<GodinaStudijaPredmet, Long>, PagingAndSortingRepository<GodinaStudijaPredmet, Long>{

	
	List<GodinaStudijaPredmet> findByGodinaStudijaIdAndVidljivTrue(Long godinaId);

}
