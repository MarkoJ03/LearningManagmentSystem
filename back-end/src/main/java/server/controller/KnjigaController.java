package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.KnjigaDTO;
import server.model.Knjiga;
import server.service.KnjigaService;

@Controller
@RequestMapping("/api/Knjiga")
public class KnjigaController extends BaseController<Knjiga, KnjigaDTO, Long> {

    @Autowired
    private KnjigaService knjigaService;

    @Override
    protected KnjigaService getService() {
        return knjigaService;
    }
}
