package server.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.annotation.security.PermitAll;

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
