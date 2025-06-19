package server.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.DodeljenoPravoPristupaDTO;
import server.model.DodeljenoPravoPristupa;
import server.service.BaseService;
import server.service.DodeljenoPravoPristupaService;

@Controller
@RequestMapping("/api/dodeljena-prava-pristupa")
public class DodeljenoPravoPristupaController extends BaseController<DodeljenoPravoPristupa, DodeljenoPravoPristupaDTO, Long>{

	@Autowired
	private DodeljenoPravoPristupaService dodeljenoPravoPristupaService;
	
	@Override
	protected BaseService<DodeljenoPravoPristupa, DodeljenoPravoPristupaDTO, Long> getService() {
		return dodeljenoPravoPristupaService;
	}

	@GetMapping("/korisnik/{id}")
	public ResponseEntity<List<DodeljenoPravoPristupaDTO>> getByKorisnikId(@PathVariable Long id) {
	    return ResponseEntity.ok(dodeljenoPravoPristupaService.findByKorisnikId(id));
	}

}
