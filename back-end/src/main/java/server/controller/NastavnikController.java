package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.NastavnikDTO;
import server.model.Nastavnik;
import server.service.BaseService;
import server.service.NastavnikService;

@Controller
@RequestMapping("/api/nastavnik")
public class NastavnikController extends BaseController<Nastavnik, NastavnikDTO, Long>{

	@Autowired
	private NastavnikService nastavnikService;

	@Override
	protected BaseService<Nastavnik, NastavnikDTO, Long> getService() {
		return nastavnikService;
	}

}
