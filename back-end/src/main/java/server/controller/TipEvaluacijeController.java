package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.TipEvaluacijeDTO;
import server.model.TipEvaluacije;
import server.service.TipEvaluacijeService;

@Controller
@RequestMapping("/api/tipovi-evaluacije")
public class TipEvaluacijeController extends BaseController<TipEvaluacije, TipEvaluacijeDTO, Long>{
	@Autowired
    private TipEvaluacijeService tipEvaluacijeService;

    @Override
    protected TipEvaluacijeService getService() {
        return tipEvaluacijeService;
    }

}
