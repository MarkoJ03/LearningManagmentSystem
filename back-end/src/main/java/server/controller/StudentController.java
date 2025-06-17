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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.annotation.security.PermitAll;
import server.DTOs.BibliotekaDTO;
import server.DTOs.StudentDTO;
import server.model.Student;
import server.service.StudentService;


@Controller
@RequestMapping("/api/studenti")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class StudentController extends BaseController<Student, StudentDTO, Long> {

    @Autowired
    private StudentService studentService;

    @Override
    protected StudentService getService() {
        return studentService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<StudentDTO>> findAll() {
        return new ResponseEntity<>(studentService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<StudentDTO> getOne(@PathVariable Long id) {
        Optional<StudentDTO> entity = studentService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PutMapping("/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA", "ROLE_STUDENT"})
    public ResponseEntity<StudentDTO> update(@PathVariable Long id, @RequestBody StudentDTO dto) {
        if (!studentService.findById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<StudentDTO>(studentService.update(id, dto), HttpStatus.OK);
    }
}