package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.BibliotekaDTO;
import server.DTOs.IshodEvaluacijeDTO;
import server.model.Biblioteka;
import server.model.IshodEvaluacije;
import server.service.BibliotekaService;
import server.service.IshodEvaluacijeService;

@Controller
@RequestMapping("/api/IshodEvaluacije")
public class IshodEvaluacijeController extends BaseController<IshodEvaluacije, IshodEvaluacijeDTO, Long> {

    @Autowired
    private IshodEvaluacijeService ishodEvaluacijeService;

    @Override
    protected IshodEvaluacijeService getService() {
        return ishodEvaluacijeService;
    }
}
