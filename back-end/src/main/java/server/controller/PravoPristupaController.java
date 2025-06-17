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
import server.DTOs.PravoPristupaDTO;
import server.model.PravoPristupa;
import server.service.BaseService;
import server.service.PravoPristupaService;

@Controller
@RequestMapping("/api/prava-pristupa")
@Secured({"ROLE_ADMIN"})
public class PravoPristupaController extends BaseController<PravoPristupa, PravoPristupaDTO, Long>{

	@Autowired
	private PravoPristupaService pravoPristupaService;
	
	@Override
	protected BaseService<PravoPristupa, PravoPristupaDTO, Long> getService() {
		return pravoPristupaService;
	}

	@GetMapping
    @Secured({"ROLE_ADIMN", "ROLE_NASTAVNIK", "ROLE_STUDENTSKA_SLUZBA"})
    public ResponseEntity<List<PravoPristupaDTO>> findAll() {
        return new ResponseEntity<>(pravoPristupaService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK", "ROLE_STUDENTSKA_SLUZBA"})
    public ResponseEntity<PravoPristupaDTO> getOne(@PathVariable Long id) {
        Optional<PravoPristupaDTO> entity = pravoPristupaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
