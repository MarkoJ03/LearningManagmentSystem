package server.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import jakarta.annotation.security.PermitAll;
import server.DTOs.NastavnikDTO;
import server.model.Nastavnik;
import server.service.BaseService;
import server.service.NastavnikService;

@Controller
@RequestMapping("/api/nastavnici")
public class NastavnikController extends BaseController<Nastavnik, NastavnikDTO, Long>{

	@Autowired
	private NastavnikService nastavnikService;

	@Override
	protected BaseService<Nastavnik, NastavnikDTO, Long> getService() {
		return nastavnikService;
	}
}
