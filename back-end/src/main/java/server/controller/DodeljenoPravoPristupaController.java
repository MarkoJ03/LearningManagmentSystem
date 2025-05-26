package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.DodeljenoPravoPristupaDTO;
import server.model.DodeljenoPravoPristupa;
import server.service.BaseService;
import server.service.DodeljenoPravoPristupaService;

@Controller
@RequestMapping("/api/dodeljena-prava-pristupa")
public class DodeljenoPravoPristupaController extends BaseController<DodeljenoPravoPristupa, DodeljenoPravoPristupaDTO, Long>{

	@Autowired
	private DodeljenoPravoPristupaService dodeljenoPravoPristupaService;
	
	@Override
	protected BaseService<DodeljenoPravoPristupa, DodeljenoPravoPristupaDTO, Long> getService() {
		return dodeljenoPravoPristupaService;
	}

}
