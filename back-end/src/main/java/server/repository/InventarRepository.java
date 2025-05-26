package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import server.model.Inventar;


public interface InventarRepository extends CrudRepository<Inventar, Long>, PagingAndSortingRepository<Inventar, Long> {

}
