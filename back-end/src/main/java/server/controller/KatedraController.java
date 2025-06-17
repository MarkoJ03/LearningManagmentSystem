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
import server.DTOs.KatedraDTO;
import server.model.Katedra;
import server.service.KatedraService;

@Controller
@RequestMapping("/api/katedre")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class KatedraController extends BaseController<Katedra, KatedraDTO, Long> {

    @Autowired
    private KatedraService katedraService;

    @Override
    protected KatedraService getService() {
        return katedraService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<KatedraDTO>> findAll() {
        return new ResponseEntity<>(katedraService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<KatedraDTO> getOne(@PathVariable Long id) {
        Optional<KatedraDTO> entity = katedraService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}