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
import server.DTOs.GradDTO;
import server.model.Grad;
import server.service.GradService;

@Controller
@RequestMapping("/api/Grad")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class GradController extends BaseController<Grad, GradDTO, Long> {

    @Autowired
    private GradService gradService;

    @Override
    protected GradService getService() {
        return gradService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<GradDTO>> findAll() {
        return new ResponseEntity<>(gradService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<GradDTO> getOne(@PathVariable Long id) {
        Optional<GradDTO> entity = gradService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
