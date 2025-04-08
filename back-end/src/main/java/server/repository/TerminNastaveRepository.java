package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.TerminNastave;

@Repository
public interface TerminNastaveRepository extends CrudRepository<TerminNastave, Long>{

}
