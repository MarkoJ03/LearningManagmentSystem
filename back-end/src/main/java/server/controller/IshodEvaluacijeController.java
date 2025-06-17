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
import server.DTOs.IshodEvaluacijeDTO;
import server.model.IshodEvaluacije;
import server.service.IshodEvaluacijeService;

@Controller
@RequestMapping("/api/ishodi-evaluacije")
@Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK"})
public class IshodEvaluacijeController extends BaseController<IshodEvaluacije, IshodEvaluacijeDTO, Long> {

    @Autowired
    private IshodEvaluacijeService ishodEvaluacijeService;

    @Override
    protected IshodEvaluacijeService getService() {
        return ishodEvaluacijeService;
    }
    
    @GetMapping
    @Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK"})
    public ResponseEntity<List<IshodEvaluacijeDTO>> findAll() {
        return new ResponseEntity<>(ishodEvaluacijeService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<IshodEvaluacijeDTO> getOne(@PathVariable Long id) {
        Optional<IshodEvaluacijeDTO> entity = ishodEvaluacijeService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
