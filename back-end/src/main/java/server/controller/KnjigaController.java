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
import server.DTOs.KnjigaDTO;
import server.model.Knjiga;
import server.service.KnjigaService;

@Controller
@RequestMapping("/api/knjige")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class KnjigaController extends BaseController<Knjiga, KnjigaDTO, Long> {

    @Autowired
    private KnjigaService knjigaService;

    @Override
    protected KnjigaService getService() {
        return knjigaService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<KnjigaDTO>> findAll() {
        return new ResponseEntity<>(knjigaService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<KnjigaDTO> getOne(@PathVariable Long id) {
        Optional<KnjigaDTO> entity = knjigaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
