package server.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import server.model.BibliotekaKnjiga;
import server.model.GodinaStudijaPredmet;


public interface BibliotekaKnjigaRepository extends CrudRepository<BibliotekaKnjiga, Long>, PagingAndSortingRepository<BibliotekaKnjiga, Long> {

	List<BibliotekaKnjiga> findByBibliotekaIdAndVidljivTrue(Long bibliotekaId);
}
