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
import server.DTOs.DepartmanDTO;
import server.model.Departman;
import server.service.DepartmanService;


@Controller
@RequestMapping("/api/departmani")
@Secured({"ROLE_ADMIN"})
public class DepartmanController extends BaseController<Departman, DepartmanDTO, Long> {

    @Autowired
    private DepartmanService departmanService;

    @Override
    protected DepartmanService getService() {
        return departmanService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<DepartmanDTO>> findAll() {
        return new ResponseEntity<>(departmanService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<DepartmanDTO> getOne(@PathVariable Long id) {
        Optional<DepartmanDTO> entity = departmanService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}