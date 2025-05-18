package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.GodinaStudijaPredmetDTO;
import server.model.GodinaStudijaPredmet;
import server.service.BaseService;
import server.service.GodinaStudijaPredmetService;

@Controller
@RequestMapping("/api/godina-studija-predmet")
public class GodinaStudijaPredmetController extends BaseController<GodinaStudijaPredmet, GodinaStudijaPredmetDTO, Long>{

	@Autowired
	private GodinaStudijaPredmetService godinaStudijaPredmetService;

	@Override
	protected BaseService<GodinaStudijaPredmet, GodinaStudijaPredmetDTO, Long> getService() {
		return godinaStudijaPredmetService;
	}

}
