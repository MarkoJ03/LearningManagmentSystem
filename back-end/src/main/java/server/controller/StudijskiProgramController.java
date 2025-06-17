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
import server.DTOs.StudijskiProgramDTO;
import server.model.StudijskiProgram;
import server.service.BaseService;
import server.service.StudijskiProgramService;

@Controller
@RequestMapping("/api/studijski-programi")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA", "ROLE_NASTAVNIK"})
public class StudijskiProgramController extends BaseController<StudijskiProgram, StudijskiProgramDTO, Long>{

	@Autowired
	private StudijskiProgramService studijskiProgramService;

	@Override
	protected BaseService<StudijskiProgram, StudijskiProgramDTO, Long> getService() {
		return studijskiProgramService;
	}
	
	@GetMapping
    @PermitAll
    public ResponseEntity<List<StudijskiProgramDTO>> findAll() {
        return new ResponseEntity<>(studijskiProgramService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<StudijskiProgramDTO> getOne(@PathVariable Long id) {
        Optional<StudijskiProgramDTO> entity = studijskiProgramService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
