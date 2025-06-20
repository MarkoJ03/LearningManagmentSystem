package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.Predmet;

@Repository
public interface PredmetRepository extends CrudRepository<Predmet, Long>, PagingAndSortingRepository<Predmet, Long>{

}
