package server.repository;

import org.springframework.data.repository.CrudRepository;


import server.model.Knjiga;

public interface KnjigaRepository extends CrudRepository <Knjiga, Long> {

}
