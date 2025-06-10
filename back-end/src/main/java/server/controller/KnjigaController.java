package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.KnjigaDTO;
import server.model.Knjiga;
import server.service.KnjigaService;

@Controller
@RequestMapping("/api/knjige")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class KnjigaController extends BaseController<Knjiga, KnjigaDTO, Long> {

    @Autowired
    private KnjigaService knjigaService;

    @Override
    protected KnjigaService getService() {
        return knjigaService;
    }
}
