package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.KatedraDTO;
import server.model.Katedra;
import server.service.KatedraService;


@Controller
@RequestMapping("/api/katedre")
public class KatedraController extends BaseController<Katedra, KatedraDTO, Long> {

    @Autowired
    private KatedraService katedraService;

    @Override
    protected KatedraService getService() {
        return katedraService;
    }
}