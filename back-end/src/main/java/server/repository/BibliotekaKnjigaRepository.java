package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import server.model.BibliotekaKnjiga;


public interface BibliotekaKnjigaRepository extends CrudRepository<BibliotekaKnjiga, Long>, PagingAndSortingRepository<BibliotekaKnjiga, Long> {

}
