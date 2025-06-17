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
import server.DTOs.DrzavaDTO;
import server.model.Drzava;
import server.service.DrzavaService;

@Controller
@RequestMapping("/api/Drzava")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class DrzavaController extends BaseController<Drzava, DrzavaDTO, Long> {

    @Autowired
    private DrzavaService drzavaService;

    @Override
    protected DrzavaService getService() {
        return drzavaService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<DrzavaDTO>> findAll() {
        return new ResponseEntity<>(drzavaService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<DrzavaDTO> getOne(@PathVariable Long id) {
        Optional<DrzavaDTO> entity = drzavaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}