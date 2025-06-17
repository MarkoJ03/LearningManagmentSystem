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
import server.DTOs.SilabusDTO;
import server.model.Silabus;
import server.service.SilabusService;

@Controller
@RequestMapping("/api/Silabus")
@Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK"})
public class SilabusController extends BaseController<Silabus, SilabusDTO, Long> {

    @Autowired
    private SilabusService silabusService;

    @Override
    protected SilabusService getService() {
        return silabusService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<SilabusDTO>> findAll() {
        return new ResponseEntity<>(silabusService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<SilabusDTO> getOne(@PathVariable Long id) {
        Optional<SilabusDTO> entity = silabusService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
