package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.StudijskiProgramDTO;
import server.model.StudijskiProgram;
import server.service.BaseService;
import server.service.StudijskiProgramService;

@Controller
@RequestMapping("/api/studijski-programi")
public class StudijskiProgramController extends BaseController<StudijskiProgram, StudijskiProgramDTO, Long>{

	@Autowired
	private StudijskiProgramService studijskiProgramService;

	@Override
	protected BaseService<StudijskiProgram, StudijskiProgramDTO, Long> getService() {
		return studijskiProgramService;
	}

}
