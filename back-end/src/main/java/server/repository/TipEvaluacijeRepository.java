package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.TipEvaluacije;
@Repository
public interface TipEvaluacijeRepository extends CrudRepository<TipEvaluacije, Long>{

}
