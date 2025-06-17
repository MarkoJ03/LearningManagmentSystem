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
import server.DTOs.GodinaStudijaPredmetDTO;
import server.model.GodinaStudijaPredmet;
import server.service.BaseService;
import server.service.GodinaStudijaPredmetService;

@Controller
@RequestMapping("/api/godina-studija-predmet")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class GodinaStudijaPredmetController extends BaseController<GodinaStudijaPredmet, GodinaStudijaPredmetDTO, Long>{

	@Autowired
	private GodinaStudijaPredmetService godinaStudijaPredmetService;

	@Override
	protected BaseService<GodinaStudijaPredmet, GodinaStudijaPredmetDTO, Long> getService() {
		return godinaStudijaPredmetService;
	}

	@GetMapping("/godina/{id}")
	public ResponseEntity<List<GodinaStudijaPredmetDTO>> getByGodinaStudija(@PathVariable Long id) {
	    return ResponseEntity.ok(godinaStudijaPredmetService.findByGodinaStudijaId(id));
	}
	
	@GetMapping
    @PermitAll
    public ResponseEntity<List<GodinaStudijaPredmetDTO>> findAll() {
        return new ResponseEntity<>(godinaStudijaPredmetService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<GodinaStudijaPredmetDTO> getOne(@PathVariable Long id) {
        Optional<GodinaStudijaPredmetDTO> entity = godinaStudijaPredmetService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
