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
import server.DTOs.GodinaStudijaDTO;
import server.model.GodinaStudija;
import server.service.GodinaStudijaService;


@Controller
@RequestMapping("/api/godine-studija")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class GodinaStudijaController extends BaseController<GodinaStudija, GodinaStudijaDTO, Long> {

    @Autowired
    private GodinaStudijaService godinaStudijaService;

    @Override
    protected GodinaStudijaService getService() {
        return godinaStudijaService; 
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<GodinaStudijaDTO>> findAll() {
        return new ResponseEntity<>(godinaStudijaService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<GodinaStudijaDTO> getOne(@PathVariable Long id) {
        Optional<GodinaStudijaDTO> entity = godinaStudijaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/program/{id}")
    public ResponseEntity<List<GodinaStudijaDTO>> getByProgramId(@PathVariable Long id) {
        return ResponseEntity.ok(godinaStudijaService.findByStudijskiProgramId(id));
    }
    

}
