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
import server.DTOs.BibliotekaDTO;
import server.DTOs.PredmetDTO;
import server.model.Predmet;
import server.service.BaseService;
import server.service.PredmetService;

@Controller
@RequestMapping("/api/predmeti")
@Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK", "ROLE_STUDENTSKA_SLUZBA"})
public class PredmetController extends BaseController<Predmet, PredmetDTO, Long>{

	@Autowired
	private PredmetService predmetService;

	@Override
	protected BaseService<Predmet, PredmetDTO, Long> getService() {
		return predmetService;
	}
	
	@GetMapping
    @PermitAll
    public ResponseEntity<List<PredmetDTO>> findAll() {
        return new ResponseEntity<>(predmetService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<PredmetDTO> getOne(@PathVariable Long id) {
        Optional<PredmetDTO> entity = predmetService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
