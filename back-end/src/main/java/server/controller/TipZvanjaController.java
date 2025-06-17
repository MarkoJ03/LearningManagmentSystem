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
import server.DTOs.TipZvanjaDTO;
import server.model.TipZvanja;
import server.service.BaseService;
import server.service.TipZvanjaService;

@Controller
@RequestMapping("/api/tipovi-zvanja")
@Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK", "ROLE_STUDENTSKA_SLUZBA"})
public class TipZvanjaController extends BaseController<TipZvanja, TipZvanjaDTO, Long>{

	@Autowired
	private TipZvanjaService tipZvanjaService;

	@Override
	protected BaseService<TipZvanja, TipZvanjaDTO, Long> getService() {
		return tipZvanjaService;
	}
	
	@GetMapping
    @PermitAll
    public ResponseEntity<List<TipZvanjaDTO>> findAll() {
        return new ResponseEntity<>(tipZvanjaService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<TipZvanjaDTO> getOne(@PathVariable Long id) {
        Optional<TipZvanjaDTO> entity = tipZvanjaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
