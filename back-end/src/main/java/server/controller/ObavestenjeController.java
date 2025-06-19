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
import server.DTOs.ObavestenjeDTO;
import server.model.Obavestenje;
import server.service.BaseService;
import server.service.ObavestenjeService;

@Controller
@RequestMapping("/api/obavestenja")
public class ObavestenjeController extends BaseController<Obavestenje, ObavestenjeDTO, Long>{

	@Autowired
	private ObavestenjeService obavestenjeService;

	@Override
	protected BaseService<Obavestenje, ObavestenjeDTO, Long> getService() {
		return obavestenjeService;
	}
    
}
