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
import server.DTOs.ObjavaDTO;
import server.model.Objava;
import server.service.ObjavaService;

@Controller
@RequestMapping("/api/objave")
@Secured({"ROLE_ADMIN, ROLE_STUDENTSKA_SLUZBA"})
public class ObjavaController extends BaseController<Objava, ObjavaDTO, Long> {

    @Autowired
    private ObjavaService objavaService;

    @Override
    protected ObjavaService getService() {
        return objavaService;
    }
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<ObjavaDTO>> findAll() {
        return new ResponseEntity<>(objavaService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<ObjavaDTO> getOne(@PathVariable Long id) {
        Optional<ObjavaDTO> entity = objavaService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
