package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.PredmetDTO;
import server.model.Predmet;
import server.service.BaseService;
import server.service.PredmetService;

@Controller
@RequestMapping("/api/predmet")
public class PredmetController extends BaseController<Predmet, PredmetDTO, Long>{

	@Autowired
	private PredmetService predmetService;

	@Override
	protected BaseService<Predmet, PredmetDTO, Long> getService() {
		return predmetService;
	}

}
