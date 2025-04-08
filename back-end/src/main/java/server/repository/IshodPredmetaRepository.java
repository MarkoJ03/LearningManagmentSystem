package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.IshodPredmeta;

@Repository
public interface IshodPredmetaRepository extends CrudRepository<IshodPredmeta, Long>{

}
