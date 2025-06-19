package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.BibliotekaDTO;
import server.model.Biblioteka;
import server.service.BibliotekaService;

@Controller
@RequestMapping("/api/biblioteke")
public class BibliotekaController extends BaseController<Biblioteka, BibliotekaDTO, Long> {

    @Autowired
    private BibliotekaService bibliotekaService;

    @Override
    protected BibliotekaService getService() {
        return bibliotekaService;
    }
}
