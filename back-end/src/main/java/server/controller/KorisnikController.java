package server.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import jakarta.annotation.security.PermitAll;
import server.DTOs.KorisnikDTO;
import server.model.Korisnik;
import server.service.KorisnikService;


@Controller
@RequestMapping("/api/korisnici")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class KorisnikController extends BaseController<Korisnik, KorisnikDTO, Long> {

    @Autowired
    private KorisnikService korisnikService;

    @Override
    protected KorisnikService getService() {
        return korisnikService;
    }

    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<KorisnikDTO> getOne(@PathVariable Long id) {
        Optional<KorisnikDTO> entity = korisnikService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}