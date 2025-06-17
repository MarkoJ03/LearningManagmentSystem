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
import server.DTOs.NastavnikDTO;
import server.model.Nastavnik;
import server.service.BaseService;
import server.service.NastavnikService;

@Controller
@RequestMapping("/api/nastavnici")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA", "ROLE_NASTAVNIK"})
public class NastavnikController extends BaseController<Nastavnik, NastavnikDTO, Long>{

	@Autowired
	private NastavnikService nastavnikService;

	@Override
	protected BaseService<Nastavnik, NastavnikDTO, Long> getService() {
		return nastavnikService;
	}
	
	@GetMapping
    @Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA", "ROLE_NASTAVNIK"})
    public ResponseEntity<List<NastavnikDTO>> findAll() {
        return new ResponseEntity<>(nastavnikService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<NastavnikDTO> getOne(@PathVariable Long id) {
        Optional<NastavnikDTO> entity = nastavnikService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
