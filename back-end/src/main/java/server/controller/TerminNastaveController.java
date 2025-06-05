package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.TerminNastaveDTO;
import server.model.TerminNastave;
import server.service.BaseService;
import server.service.TerminNastaveService;

@Controller
@RequestMapping("/api/termini-nastave")
@Secured({"ROLE_ADMIN, ROLE_NASTAVNIK"})
public class TerminNastaveController extends BaseController<TerminNastave, TerminNastaveDTO, Long>{

	@Autowired
	private TerminNastaveService terminNastaveService;

	@Override
	protected BaseService<TerminNastave, TerminNastaveDTO, Long> getService() {
		return terminNastaveService;
	}

}
