package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.NaucnaOblast;

@Repository
public interface NaucnaOblastRepository extends CrudRepository<NaucnaOblast, Long>{

}
