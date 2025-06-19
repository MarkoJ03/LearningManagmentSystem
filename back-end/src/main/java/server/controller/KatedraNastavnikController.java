package server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.KatedraNastavnikDTO;
import server.model.KatedraNastavnik;
import server.service.KatedraNastavnikService;

@Controller
@RequestMapping("/api/katedra-nastavnik")
public class KatedraNastavnikController extends BaseController<KatedraNastavnik, KatedraNastavnikDTO, Long> {

    @Autowired
    private KatedraNastavnikService katedraNastavnikService;

    @Override
    protected KatedraNastavnikService getService() {
        return katedraNastavnikService;
    }
    
    @GetMapping("/katedra/{id}")
	public ResponseEntity<List<KatedraNastavnikDTO>> getByKatedraId(@PathVariable Long id) {
	    return ResponseEntity.ok(katedraNastavnikService.findByKatedraId(id));
	}
}