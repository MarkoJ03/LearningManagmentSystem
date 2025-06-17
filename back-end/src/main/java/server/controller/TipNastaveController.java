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
import server.DTOs.TipNastaveDTO;
import server.model.TipNastave;
import server.service.BaseService;
import server.service.TipNastaveService;

@Controller
@RequestMapping("/api/tipovi-nastave")
@Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK", "ROLE_STUDENTSKA_SLUZBA"})
public class TipNastaveController extends BaseController<TipNastave, TipNastaveDTO, Long>{

	@Autowired
	private TipNastaveService tipNastaveService;

	@Override
	protected BaseService<TipNastave, TipNastaveDTO, Long> getService() {
		return tipNastaveService;
	}

	@GetMapping
    @PermitAll
    public ResponseEntity<List<TipNastaveDTO>> findAll() {
        return new ResponseEntity<>(tipNastaveService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<TipNastaveDTO> getOne(@PathVariable Long id) {
        Optional<TipNastaveDTO> entity = tipNastaveService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
	
}
