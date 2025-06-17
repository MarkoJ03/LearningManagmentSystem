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
import server.DTOs.EvaluacijaZnanjaDTO;
import server.model.EvaluacijaZnanja;
import server.service.EvaluacijaZnanjaService;

@Controller
@RequestMapping("/api/evaluacije-znanja")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA", "ROLE_NASTAVNIK"})
public class EvaluacijaZnanjaController extends BaseController<EvaluacijaZnanja, EvaluacijaZnanjaDTO, Long> {

    @Autowired
    private EvaluacijaZnanjaService evaluacijaZnanjaService;

    @Override
    protected EvaluacijaZnanjaService getService() {
        return evaluacijaZnanjaService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<EvaluacijaZnanjaDTO>> findAll() {
        return new ResponseEntity<>(evaluacijaZnanjaService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<EvaluacijaZnanjaDTO> getOne(@PathVariable Long id) {
        Optional<EvaluacijaZnanjaDTO> entity = evaluacijaZnanjaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
