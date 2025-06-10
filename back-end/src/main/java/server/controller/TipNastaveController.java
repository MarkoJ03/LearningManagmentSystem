package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.TipNastaveDTO;
import server.model.TipNastave;
import server.service.BaseService;
import server.service.TipNastaveService;

@Controller
@RequestMapping("/api/tipovi-nastave")
@Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK"})
public class TipNastaveController extends BaseController<TipNastave, TipNastaveDTO, Long>{

	@Autowired
	private TipNastaveService tipNastaveService;

	@Override
	protected BaseService<TipNastave, TipNastaveDTO, Long> getService() {
		return tipNastaveService;
	}

}
