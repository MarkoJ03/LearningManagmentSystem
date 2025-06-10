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
import server.DTOs.RealizacijaPredmetaDTO;
import server.model.RealizacijaPredmeta;
import server.service.BaseService;
import server.service.RealizacijaPredmetaService;

@Controller
@RequestMapping("/api/realizacije-predmeta")
@Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK"})
public class RealizacijaPredmetaController extends BaseController<RealizacijaPredmeta, RealizacijaPredmetaDTO, Long>{

	@Autowired
	private RealizacijaPredmetaService realizacijaPredmetaService;

	@Override
	protected BaseService<RealizacijaPredmeta, RealizacijaPredmetaDTO, Long> getService() {
		return realizacijaPredmetaService;
	}

	@GetMapping
    @PermitAll
    public ResponseEntity<List<RealizacijaPredmetaDTO>> findAll() {
        return new ResponseEntity<>(realizacijaPredmetaService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<RealizacijaPredmetaDTO> getOne(@PathVariable Long id) {
        Optional<RealizacijaPredmetaDTO> entity = realizacijaPredmetaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
