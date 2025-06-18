package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.KorisnikDTO;
import server.model.Korisnik;
import server.service.KorisnikService;


@Controller
@RequestMapping("/api/korisnici")
public class KorisnikController extends BaseController<Korisnik, KorisnikDTO, Long> {

    @Autowired
    private KorisnikService korisnikService;

    @Override
    protected KorisnikService getService() {
        return korisnikService;
    }

}