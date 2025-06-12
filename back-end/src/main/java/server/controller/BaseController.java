package server.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.annotation.security.PermitAll;
import server.service.BaseService;

//@Secured("ROLE_ADMIN")
public abstract class BaseController<T, DTO, ID> {

    protected abstract BaseService<T, DTO, ID> getService();

    @GetMapping
    public ResponseEntity<List<DTO>> findAll() {
        return new ResponseEntity<>(getService().findAll(), HttpStatus.OK);
    }


    @GetMapping("/all")
    public ResponseEntity<List<DTO>> findAllIncludeDeleted() {
        return new ResponseEntity<>(getService().findAllIncludeDeleted(), HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<DTO> getOne(@PathVariable ID id) {
        Optional<DTO> entity = getService().findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<DTO> add(@RequestBody DTO dto) {
        return new ResponseEntity<>(getService().save(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DTO> update(@PathVariable ID id, @RequestBody DTO dto) {
        if (!getService().findById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(getService().update(id, dto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable ID id) {
        if (!getService().findById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        getService().deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}