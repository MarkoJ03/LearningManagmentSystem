package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
