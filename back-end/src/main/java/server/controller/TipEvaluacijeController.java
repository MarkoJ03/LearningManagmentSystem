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
import server.DTOs.TipEvaluacijeDTO;
import server.model.TipEvaluacije;
import server.service.TipEvaluacijeService;

@Controller
@RequestMapping("/api/tipovi-evaluacije")
@Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK", "ROLE_STUDENTSKA_SLUZBA"})
public class TipEvaluacijeController extends BaseController<TipEvaluacije, TipEvaluacijeDTO, Long>{
	@Autowired
    private TipEvaluacijeService tipEvaluacijeService;

    @Override
    protected TipEvaluacijeService getService() {
        return tipEvaluacijeService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<TipEvaluacijeDTO>> findAll() {
        return new ResponseEntity<>(tipEvaluacijeService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<TipEvaluacijeDTO> getOne(@PathVariable Long id) {
        Optional<TipEvaluacijeDTO> entity = tipEvaluacijeService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
