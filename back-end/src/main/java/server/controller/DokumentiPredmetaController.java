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
import server.DTOs.DokumentiPredmetaDTO;
import server.model.DokumentiPredmeta;
import server.service.BaseService;
import server.service.DokumentiPredmetaService;

@Controller
@RequestMapping("/api/dokumenti-predmeta")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class DokumentiPredmetaController extends BaseController<DokumentiPredmeta, DokumentiPredmetaDTO, Long>{

	@Autowired
	private DokumentiPredmetaService dokumentiPredmetaService;

	@Override
	protected BaseService<DokumentiPredmeta, DokumentiPredmetaDTO, Long> getService() {
		return dokumentiPredmetaService;
	}
	
	@GetMapping
    @PermitAll
    public ResponseEntity<List<DokumentiPredmetaDTO>> findAll() {
        return new ResponseEntity<>(dokumentiPredmetaService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<DokumentiPredmetaDTO> getOne(@PathVariable Long id) {
        Optional<DokumentiPredmetaDTO> entity = dokumentiPredmetaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
