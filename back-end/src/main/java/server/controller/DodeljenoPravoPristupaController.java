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
import server.DTOs.DodeljenoPravoPristupaDTO;
import server.model.DodeljenoPravoPristupa;
import server.service.BaseService;
import server.service.DodeljenoPravoPristupaService;

@Controller
@RequestMapping("/api/dodeljena-prava-pristupa")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class DodeljenoPravoPristupaController extends BaseController<DodeljenoPravoPristupa, DodeljenoPravoPristupaDTO, Long>{

	@Autowired
	private DodeljenoPravoPristupaService dodeljenoPravoPristupaService;
	
	@Override
	protected BaseService<DodeljenoPravoPristupa, DodeljenoPravoPristupaDTO, Long> getService() {
		return dodeljenoPravoPristupaService;
	}

	@GetMapping("/korisnik/{id}")
	public ResponseEntity<List<DodeljenoPravoPristupaDTO>> getByKorisnikId(@PathVariable Long id) {
	    return ResponseEntity.ok(dodeljenoPravoPristupaService.findByKorisnikId(id));
	}
	
	@GetMapping
    @PermitAll
    public ResponseEntity<List<DodeljenoPravoPristupaDTO>> findAll() {
        return new ResponseEntity<>(dodeljenoPravoPristupaService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<DodeljenoPravoPristupaDTO> getOne(@PathVariable Long id) {
        Optional<DodeljenoPravoPristupaDTO> entity = dodeljenoPravoPristupaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
