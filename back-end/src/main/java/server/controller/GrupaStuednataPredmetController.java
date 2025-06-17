package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.GrupaStudenataPredmetDTO;
import server.model.GrupaStudenataPredmet;
import server.service.BaseService;
import server.service.GrupaStudenataPredmetService;

@Controller
@RequestMapping("/api/grupa-studenata-predmet")
public class GrupaStuednataPredmetController extends BaseController<GrupaStudenataPredmet, GrupaStudenataPredmetDTO, Long>{

	@Autowired
	private GrupaStudenataPredmetService grupaStudenataPredmetService;
	
	@Override
	protected BaseService<GrupaStudenataPredmet, GrupaStudenataPredmetDTO, Long> getService() {
		return grupaStudenataPredmetService;
	}

}
