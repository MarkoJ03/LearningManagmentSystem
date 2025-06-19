package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.DokumentiPredmetaDTO;
import server.model.DokumentiPredmeta;
import server.service.BaseService;
import server.service.DokumentiPredmetaService;

@Controller
@RequestMapping("/api/dokumenti-predmeta")
public class DokumentiPredmetaController extends BaseController<DokumentiPredmeta, DokumentiPredmetaDTO, Long>{

	@Autowired
	private DokumentiPredmetaService dokumentiPredmetaService;

	@Override
	protected BaseService<DokumentiPredmeta, DokumentiPredmetaDTO, Long> getService() {
		return dokumentiPredmetaService;
	}

}
