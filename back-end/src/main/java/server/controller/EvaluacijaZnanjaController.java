package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.EvaluacijaZnanjaDTO;
import server.model.EvaluacijaZnanja;
import server.service.EvaluacijaZnanjaService;

@Controller
@RequestMapping("/api/evaluacije-znanja")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class EvaluacijaZnanjaController extends BaseController<EvaluacijaZnanja, EvaluacijaZnanjaDTO, Long> {

    @Autowired
    private EvaluacijaZnanjaService evaluacijaZnanjaService;

    @Override
    protected EvaluacijaZnanjaService getService() {
        return evaluacijaZnanjaService;
    }
}
