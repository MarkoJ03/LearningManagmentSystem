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
import server.DTOs.OsobljeDTO;
import server.model.Osoblje;
import server.service.OsobljeService;

@Controller
@RequestMapping("/api/osoblje")
@Secured({"ROLE_ADMIN, ROLE_STUDENTSKA_SLUZBA"})

public class OsobljeController extends BaseController<Osoblje, OsobljeDTO, Long> {

    @Autowired
    private OsobljeService osobljeService;

    @Override
    protected OsobljeService getService() {
        return osobljeService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<OsobljeDTO>> findAll() {
        return new ResponseEntity<>(osobljeService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<OsobljeDTO> getOne(@PathVariable Long id) {
        Optional<OsobljeDTO> entity = osobljeService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
