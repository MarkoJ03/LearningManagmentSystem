package server.controller;

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
import server.DTOs.StudentskaSluzbaDTO;
import server.model.StudentskaSluzba;
import server.service.StudentskaSluzbaService;

@Controller
@RequestMapping("/api/studentske-sluzbe")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class StudentskaSluzbaController extends BaseController<StudentskaSluzba, StudentskaSluzbaDTO, Long> {

    @Autowired
    private StudentskaSluzbaService studentskaSluzbaService;

    @Override
    protected StudentskaSluzbaService getService() {
        return studentskaSluzbaService;
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<StudentskaSluzbaDTO> getOne(@PathVariable Long id) {
        Optional<StudentskaSluzbaDTO> entity = studentskaSluzbaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
