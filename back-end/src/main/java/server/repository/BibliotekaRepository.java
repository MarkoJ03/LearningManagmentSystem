package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import server.model.Biblioteka;


public interface BibliotekaRepository extends CrudRepository<Biblioteka, Long>, PagingAndSortingRepository<Biblioteka, Long>{

}
