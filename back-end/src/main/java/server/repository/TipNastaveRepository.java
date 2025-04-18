package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.TipNastave;

@Repository
public interface TipNastaveRepository extends CrudRepository<TipNastave, Long>{

}
