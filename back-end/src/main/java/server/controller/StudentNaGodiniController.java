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
import server.DTOs.StudentNaGodiniDTO;
import server.model.StudentNaGodini;
import server.service.StudentNaGodiniService;


@Controller
@RequestMapping("/api/studenti-na-godini")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class StudentNaGodiniController extends BaseController<StudentNaGodini, StudentNaGodiniDTO, Long> {

    @Autowired
    private StudentNaGodiniService studentNaGodiniService;

    @Override
    protected StudentNaGodiniService getService() {
        return studentNaGodiniService;
    }
    
    @GetMapping
    @Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA", "ROLE_NASTAVNIK"})
    public ResponseEntity<List<StudentNaGodiniDTO>> findAll() {
        return new ResponseEntity<>(studentNaGodiniService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA", "ROLE_NASTAVNIK"})
    public ResponseEntity<StudentNaGodiniDTO> getOne(@PathVariable Long id) {
        Optional<StudentNaGodiniDTO> entity = studentNaGodiniService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}