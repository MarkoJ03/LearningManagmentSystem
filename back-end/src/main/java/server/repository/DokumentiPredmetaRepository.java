package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.DokumentiPredmeta;

@Repository
public interface DokumentiPredmetaRepository extends CrudRepository<DokumentiPredmeta, Long>{

}
