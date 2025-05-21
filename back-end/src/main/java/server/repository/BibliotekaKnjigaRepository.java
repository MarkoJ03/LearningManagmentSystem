package server.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import server.model.BibliotekaKnjiga;
import server.model.GodinaStudijaPredmet;


public interface BibliotekaKnjigaRepository extends CrudRepository<BibliotekaKnjiga, Long> {

	List<BibliotekaKnjiga> findByBibliotekaIdAndVidljivTrue(Long bibliotekaId);
}
