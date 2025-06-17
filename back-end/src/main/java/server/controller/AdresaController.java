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
import server.DTOs.AdresaDTO;
import server.model.Adresa;
import server.service.AdresaService;


@Controller
@RequestMapping("/api/adrese")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class AdresaController extends BaseController<Adresa, AdresaDTO, Long> {

    @Autowired
    private AdresaService adresaService;

    @Override
    protected AdresaService getService() {
        return adresaService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<AdresaDTO>> findAll() {
        return new ResponseEntity<>(adresaService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<AdresaDTO> getOne(@PathVariable Long id) {
        Optional<AdresaDTO> entity = adresaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}