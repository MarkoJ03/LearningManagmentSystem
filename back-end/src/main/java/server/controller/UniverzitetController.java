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
import server.DTOs.BibliotekaDTO;
import server.DTOs.UniverzitetDTO;
import server.model.Univerzitet;
import server.service.UniverzitetService;


@Controller
@RequestMapping("/api/univerziteti")
@Secured({"ROLE_ADMIN"})
public class UniverzitetController extends BaseController<Univerzitet, UniverzitetDTO, Long> {

    @Autowired
    private UniverzitetService univerzitetService;

    @Override
    protected UniverzitetService getService() {
        return univerzitetService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<UniverzitetDTO>> findAll() {
        return new ResponseEntity<>(univerzitetService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<UniverzitetDTO> getOne(@PathVariable Long id) {
        Optional<UniverzitetDTO> entity = univerzitetService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
}