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
import server.DTOs.TerminNastaveDTO;
import server.model.TerminNastave;
import server.service.BaseService;
import server.service.TerminNastaveService;

@Controller
@RequestMapping("/api/termini-nastave")
@Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK", "ROLE_STUDENTSKA_SLUZBA"})
public class TerminNastaveController extends BaseController<TerminNastave, TerminNastaveDTO, Long>{

	@Autowired
	private TerminNastaveService terminNastaveService;

	@Override
	protected BaseService<TerminNastave, TerminNastaveDTO, Long> getService() {
		return terminNastaveService;
	}
	
	@GetMapping
    @PermitAll
    public ResponseEntity<List<TerminNastaveDTO>> findAll() {
        return new ResponseEntity<>(terminNastaveService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<TerminNastaveDTO> getOne(@PathVariable Long id) {
        Optional<TerminNastaveDTO> entity = terminNastaveService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
