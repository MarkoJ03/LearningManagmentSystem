package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.TipProgramaDTO;
import server.model.TipPrograma;
import server.service.BaseService;
import server.service.TipProgramaService;

@Controller
@RequestMapping("/api/tipovi-programa")
public class TipProgramaController extends BaseController<TipPrograma, TipProgramaDTO, Long>{

	@Autowired
	private TipProgramaService tipProgramaService;

	@Override
	protected BaseService<TipPrograma, TipProgramaDTO, Long> getService() {
		return tipProgramaService;
	}

/////////////////  getAll, getById svi @PermitAll
}
