package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.DrzavaDTO;
import server.model.Drzava;
import server.service.DrzavaService;

@Controller
@RequestMapping("/api/Drzava")

public class DrzavaController extends BaseController<Drzava, DrzavaDTO, Long> {

    @Autowired
    private DrzavaService drzavaService;

    @Override
    protected DrzavaService getService() {
        return drzavaService;
    }
}