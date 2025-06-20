package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.PravoPristupaDTO;
import server.model.PravoPristupa;
import server.service.BaseService;
import server.service.PravoPristupaService;

@Controller
@RequestMapping("/api/prava-pristupa")
public class PravoPristupaController extends BaseController<PravoPristupa, PravoPristupaDTO, Long>{

	@Autowired
	private PravoPristupaService pravoPristupaService;
	
	@Override
	protected BaseService<PravoPristupa, PravoPristupaDTO, Long> getService() {
		return pravoPristupaService;
	}

}
