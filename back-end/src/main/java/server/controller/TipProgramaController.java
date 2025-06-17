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
import server.DTOs.TipProgramaDTO;
import server.model.TipPrograma;
import server.service.BaseService;
import server.service.TipProgramaService;

@Controller
@RequestMapping("/api/tipovi-programa")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class TipProgramaController extends BaseController<TipPrograma, TipProgramaDTO, Long>{

	@Autowired
	private TipProgramaService tipProgramaService;

	@Override
	protected BaseService<TipPrograma, TipProgramaDTO, Long> getService() {
		return tipProgramaService;
	}
	
	@GetMapping
    @PermitAll
    public ResponseEntity<List<TipProgramaDTO>> findAll() {
        return new ResponseEntity<>(tipProgramaService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<TipProgramaDTO> getOne(@PathVariable Long id) {
        Optional<TipProgramaDTO> entity = tipProgramaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
