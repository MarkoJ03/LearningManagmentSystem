package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import server.model.EvaluacijaZnanja;


public interface EvaluacijaZnanjaRepository extends CrudRepository<EvaluacijaZnanja, Long>, PagingAndSortingRepository<EvaluacijaZnanja, Long>{

	
}
