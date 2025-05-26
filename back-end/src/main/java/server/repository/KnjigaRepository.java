package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import server.model.Knjiga;

public interface KnjigaRepository extends CrudRepository <Knjiga, Long>, PagingAndSortingRepository<Knjiga, Long> {

}
