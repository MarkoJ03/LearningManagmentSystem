package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.InventarDTO;
import server.model.Inventar;
import server.service.InventarService;

@Controller
@RequestMapping("/api/inventari")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class InventarController extends BaseController<Inventar, InventarDTO, Long> {

    @Autowired
    private InventarService inventarService;

    @Override
    protected InventarService getService() {
        return inventarService;
    }
}
