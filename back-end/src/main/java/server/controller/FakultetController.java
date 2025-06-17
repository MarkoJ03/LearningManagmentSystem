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
import server.DTOs.FakultetDTO;
import server.model.Fakultet;
import server.service.FakultetService;


@Controller
@RequestMapping("/api/fakulteti")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class FakultetController extends BaseController<Fakultet, FakultetDTO, Long> {

    @Autowired
    private FakultetService fakultetService;

    @Override
    protected FakultetService getService() {
        return fakultetService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<FakultetDTO>> findAll() {
        return new ResponseEntity<>(fakultetService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<FakultetDTO> getOne(@PathVariable Long id) {
        Optional<FakultetDTO> entity = fakultetService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
