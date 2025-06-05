package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import server.model.GrupaStudenata;

public interface GrupaStudenataRepository extends CrudRepository<GrupaStudenata, Long>, PagingAndSortingRepository<GrupaStudenata, Long>{

}
