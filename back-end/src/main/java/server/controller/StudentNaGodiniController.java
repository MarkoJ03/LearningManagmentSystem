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
public class StudentNaGodiniController extends BaseController<StudentNaGodini, StudentNaGodiniDTO, Long> {

    @Autowired
    private StudentNaGodiniService studentNaGodiniService;

    @Override
    protected StudentNaGodiniService getService() {
        return studentNaGodiniService;
    }
    
    @GetMapping("/{predmetId}/studenti-na-godini")
    public ResponseEntity<List<StudentNaGodiniDTO>> getStudentiNaGodiniByPredmet(@PathVariable Long predmetId) {
        List<StudentNaGodiniDTO> studentiDTO = studentNaGodiniService.findStudentNaGodiniByPredmetId(predmetId);
        return ResponseEntity.ok(studentiDTO);
    }
}