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
import server.DTOs.IspitniRokDTO;
import server.model.IspitniRok;
import server.service.IspitniRokService;

@Controller
@RequestMapping("/api/IspitniRok")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class IspitniRokController extends BaseController<IspitniRok, IspitniRokDTO, Long> {

    @Autowired
    private IspitniRokService ispitniRokService;

    @Override
    protected IspitniRokService getService() {
        return ispitniRokService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<IspitniRokDTO>> findAll() {
        return new ResponseEntity<>(ispitniRokService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<IspitniRokDTO> getOne(@PathVariable Long id) {
        Optional<IspitniRokDTO> entity = ispitniRokService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
