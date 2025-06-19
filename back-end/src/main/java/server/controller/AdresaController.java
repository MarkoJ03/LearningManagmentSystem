package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;


import server.DTOs.AdresaDTO;
import server.model.Adresa;
import server.service.AdresaService;


@Controller
@RequestMapping("/api/adrese")

public class AdresaController extends BaseController<Adresa, AdresaDTO, Long> {

    @Autowired
    private AdresaService adresaService;

    @Override
    protected AdresaService getService() {
        return adresaService;
    }
}