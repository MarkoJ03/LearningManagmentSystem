package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.BibliotekaKnjigaDTO;
import server.model.BibliotekaKnjiga;
import server.service.BibliotekaKnjigaService;

@Controller
@RequestMapping("/api/biblioteka-knjiga")
public class BibliotekaKnjigaController extends BaseController<BibliotekaKnjiga, BibliotekaKnjigaDTO, Long> {

    @Autowired
    private BibliotekaKnjigaService bibliotekaKnjigaService;

    @Override
    protected BibliotekaKnjigaService getService() {
        return bibliotekaKnjigaService;
    }
}
