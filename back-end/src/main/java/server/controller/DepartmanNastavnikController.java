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
import server.DTOs.DepartmanNastavnikDTO;
import server.model.DepartmanNastavnik;
import server.service.DepartmanNastavnikService;


@Controller
@RequestMapping("/api/departman-nastavnik")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class DepartmanNastavnikController extends BaseController<DepartmanNastavnik, DepartmanNastavnikDTO, Long> {

    @Autowired
    private DepartmanNastavnikService departmanNastavnikService;

    @Override
    protected DepartmanNastavnikService getService() {
        return departmanNastavnikService;
    }
    

    @GetMapping("/departman/{id}")
	public ResponseEntity<List<DepartmanNastavnikDTO>> getByDepartmanId(@PathVariable Long id) {
	    return ResponseEntity.ok(departmanNastavnikService.findByDepartmanId(id));
	}
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<DepartmanNastavnikDTO>> findAll() {
        return new ResponseEntity<>(departmanNastavnikService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<DepartmanNastavnikDTO> getOne(@PathVariable Long id) {
        Optional<DepartmanNastavnikDTO> entity = departmanNastavnikService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}