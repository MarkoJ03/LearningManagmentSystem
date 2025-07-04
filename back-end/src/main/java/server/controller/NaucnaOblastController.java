package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.NaucnaOblastDTO;
import server.model.NaucnaOblast;
import server.service.BaseService;
import server.service.NaucnaOblastService;

@Controller
@RequestMapping("/api/naucne-oblasti")
public class NaucnaOblastController extends BaseController<NaucnaOblast, NaucnaOblastDTO, Long>{

	@Autowired
	private NaucnaOblastService naucnaOblastService;

	@Override
	protected BaseService<NaucnaOblast, NaucnaOblastDTO, Long> getService() {
		return naucnaOblastService;
	}

}
