package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.TipZvanjaDTO;
import server.model.TipZvanja;
import server.service.BaseService;
import server.service.TipZvanjaService;

@Controller
@RequestMapping("/api/tip-zvanja")
public class TipZvanjaController extends BaseController<TipZvanja, TipZvanjaDTO, Long>{

	@Autowired
	private TipZvanjaService tipZvanjaService;
	
	@Override
	protected BaseService<TipZvanja, TipZvanjaDTO, Long> getService() {
		return tipZvanjaService;
	}

}
