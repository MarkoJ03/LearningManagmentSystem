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
import server.DTOs.ZvanjeDTO;
import server.model.Zvanje;
import server.service.BaseService;
import server.service.ZvanjeService;

@Controller
@RequestMapping("/api/zvanja")
@Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK", "ROLE_STUDENTSKA_SLUZBA"})
public class ZvanjeController extends BaseController<Zvanje, ZvanjeDTO, Long>{

	@Autowired
	private ZvanjeService zvanjeService;

	@Override
	protected BaseService<Zvanje, ZvanjeDTO, Long> getService() {
		return zvanjeService;
	}

	@GetMapping
    @PermitAll
    public ResponseEntity<List<ZvanjeDTO>> findAll() {
        return new ResponseEntity<>(zvanjeService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<ZvanjeDTO> getOne(@PathVariable Long id) {
        Optional<ZvanjeDTO> entity = zvanjeService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
