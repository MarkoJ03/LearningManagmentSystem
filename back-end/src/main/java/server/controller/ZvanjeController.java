package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.ZvanjeDTO;
import server.model.Zvanje;
import server.service.BaseService;
import server.service.ZvanjeService;

@Controller
@RequestMapping("/api/zvanje")
public class ZvanjeController extends BaseController<Zvanje, ZvanjeDTO, Long>{

	@Autowired
	private ZvanjeService zvanjeService;

	@Override
	protected BaseService<Zvanje, ZvanjeDTO, Long> getService() {
		return zvanjeService;
	}

}
