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
import server.DTOs.IshodPredmetaDTO;
import server.model.IshodPredmeta;
import server.service.BaseService;
import server.service.IshodPredmetaService;

@Controller
@RequestMapping("/api/ishod-predmeta")
@Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK"})
public class IshodPredmetaController extends BaseController<IshodPredmeta, IshodPredmetaDTO, Long>{

	@Autowired
	private IshodPredmetaService ishodPredmetaService;

	@Override
	protected BaseService<IshodPredmeta, IshodPredmetaDTO, Long> getService() {
		return ishodPredmetaService;
	}
	
	@GetMapping
    @PermitAll
    public ResponseEntity<List<IshodPredmetaDTO>> findAll() {
        return new ResponseEntity<>(ishodPredmetaService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<IshodPredmetaDTO> getOne(@PathVariable Long id) {
        Optional<IshodPredmetaDTO> entity = ishodPredmetaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
