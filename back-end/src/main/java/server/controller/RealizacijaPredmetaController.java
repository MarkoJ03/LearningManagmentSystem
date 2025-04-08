package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.RealizacijaPredmetaDTO;
import server.model.RealizacijaPredmeta;
import server.service.BaseService;
import server.service.RealizacijaPredmetaService;

@Controller
@RequestMapping("/api/realizacija-predmeta")
public class RealizacijaPredmetaController extends BaseController<RealizacijaPredmeta, RealizacijaPredmetaDTO, Long>{

	@Autowired
	private RealizacijaPredmetaService realizacijaPredmetaService;
	
	@Override
	protected BaseService<RealizacijaPredmeta, RealizacijaPredmetaDTO, Long> getService() {
		return realizacijaPredmetaService;
	}

}
