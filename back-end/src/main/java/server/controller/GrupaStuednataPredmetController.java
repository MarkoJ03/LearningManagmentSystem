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
import server.DTOs.GrupaStudenataPredmetDTO;
import server.model.GrupaStudenataPredmet;
import server.service.BaseService;
import server.service.GrupaStudenataPredmetService;

@Controller
@RequestMapping("/api/grupa-studenata-predmet")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class GrupaStuednataPredmetController extends BaseController<GrupaStudenataPredmet, GrupaStudenataPredmetDTO, Long>{

	@Autowired
	private GrupaStudenataPredmetService grupaStudenataPredmetService;
	
	@Override
	protected BaseService<GrupaStudenataPredmet, GrupaStudenataPredmetDTO, Long> getService() {
		return grupaStudenataPredmetService;
	}

	@GetMapping
    @Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA", "ROLE_NASTAVNIK"})
    public ResponseEntity<List<GrupaStudenataPredmetDTO>> findAll() {
        return new ResponseEntity<>(grupaStudenataPredmetService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<GrupaStudenataPredmetDTO> getOne(@PathVariable Long id) {
        Optional<GrupaStudenataPredmetDTO> entity = grupaStudenataPredmetService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
	
}
