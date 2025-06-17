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
import server.DTOs.KatedraNastavnikDTO;
import server.model.KatedraNastavnik;
import server.service.KatedraNastavnikService;


@Controller
@RequestMapping("/api/katedra-nastavnik")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class KatedraNastavnikController extends BaseController<KatedraNastavnik, KatedraNastavnikDTO, Long> {

    @Autowired
    private KatedraNastavnikService katedraNastavnikService;

    @Override
    protected KatedraNastavnikService getService() {
        return katedraNastavnikService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<KatedraNastavnikDTO>> findAll() {
        return new ResponseEntity<>(katedraNastavnikService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<KatedraNastavnikDTO> getOne(@PathVariable Long id) {
        Optional<KatedraNastavnikDTO> entity = katedraNastavnikService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/katedra/{id}")
	public ResponseEntity<List<KatedraNastavnikDTO>> getByKatedraId(@PathVariable Long id) {
	    return ResponseEntity.ok(katedraNastavnikService.findByKatedraId(id));
	}
}