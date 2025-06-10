package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.IshodEvaluacijeDTO;
import server.model.IshodEvaluacije;
import server.service.IshodEvaluacijeService;

@Controller
@RequestMapping("/api/ishodi-evaluacije")
@Secured({"ROLE_ADMIN", "ROLE_NASTAVNIK"})
public class IshodEvaluacijeController extends BaseController<IshodEvaluacije, IshodEvaluacijeDTO, Long> {

    @Autowired
    private IshodEvaluacijeService ishodEvaluacijeService;

    @Override
    protected IshodEvaluacijeService getService() {
        return ishodEvaluacijeService;
    }
}
