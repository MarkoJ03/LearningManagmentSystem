package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.TipZvanja;

@Repository
public interface TipZvanjaRepository extends CrudRepository<TipZvanja, Long>{

}
