package server.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import jakarta.annotation.security.PermitAll;
import server.DTOs.BibliotekaKnjigaDTO;
import server.model.BibliotekaKnjiga;
import server.service.BibliotekaKnjigaService;

@Controller
@RequestMapping("/api/biblioteka-knjiga")
public class BibliotekaKnjigaController extends BaseController<BibliotekaKnjiga, BibliotekaKnjigaDTO, Long> {

    @Autowired
    private BibliotekaKnjigaService bibliotekaKnjigaService;

    @Override
    protected BibliotekaKnjigaService getService() {
        return bibliotekaKnjigaService;
    }
    
	@GetMapping("/biblioteka/{id}")
	public ResponseEntity<List<BibliotekaKnjigaDTO>> getByBibliotekaId(@PathVariable Long id) {
	    return ResponseEntity.ok(bibliotekaKnjigaService.findByBibliotekaId(id));
	}

}
