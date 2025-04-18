package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.RealizacijaPredmeta;

@Repository
public interface RealizacijaPredmetaRepository extends CrudRepository<RealizacijaPredmeta, Long>{

}
