package server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.BibliotekaKnjigaDTO;
import server.DTOs.DepartmanNastavnikDTO;
import server.model.DepartmanNastavnik;
import server.service.DepartmanNastavnikService;


@Controller
@RequestMapping("/api/departman-nastavnik")
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
}