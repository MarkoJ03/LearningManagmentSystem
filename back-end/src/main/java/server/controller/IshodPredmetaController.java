package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.IshodPredmetaDTO;
import server.model.IshodPredmeta;
import server.service.BaseService;
import server.service.IshodPredmetaService;

@Controller
@RequestMapping("/api/ishod-predmeta")
@Secured({"ROLE_ADMIN, ROLE_NASTAVNIK"})
public class IshodPredmetaController extends BaseController<IshodPredmeta, IshodPredmetaDTO, Long>{

	@Autowired
	private IshodPredmetaService ishodPredmetaService;

	@Override
	protected BaseService<IshodPredmeta, IshodPredmetaDTO, Long> getService() {
		return ishodPredmetaService;
	}

}
