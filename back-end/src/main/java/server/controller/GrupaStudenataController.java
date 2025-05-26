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
import server.DTOs.GrupaStudenataDTO;
import server.model.GrupaStudenata;
import server.service.GrupaStudenataService;

@Controller
@RequestMapping("/api/grupe-studenata")
public class GrupaStudenataController extends BaseController<GrupaStudenata, GrupaStudenataDTO, Long> {

    @Autowired
    private GrupaStudenataService grupaStudenataService;

    @Override
    protected GrupaStudenataService getService() {
        return grupaStudenataService;
    }
    
    @GetMapping
    @Secured({"ROLE_ADMIN, ROLE_NASTAVNIK"})
    public ResponseEntity<List<GrupaStudenataDTO>> findAll() {
        return new ResponseEntity<>(grupaStudenataService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN, ROLE_NASTAVNIK, ROLE_STUDENT"})
    public ResponseEntity<GrupaStudenataDTO> getOne(@PathVariable Long id) {
        Optional<GrupaStudenataDTO> entity = grupaStudenataService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
