package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.SvObrazacDTO;
import server.model.SvObrazac;
import server.service.SvObrazacService;

@Controller
@RequestMapping("/api/sv-obrazac")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA", "ROLE_STUDENT"})
public class SvObrazacController extends BaseController<SvObrazac, SvObrazacDTO, Long> {

    @Autowired
    private SvObrazacService svObrazacService;

    @Override
    protected SvObrazacService getService() {
        return svObrazacService;
    }
}