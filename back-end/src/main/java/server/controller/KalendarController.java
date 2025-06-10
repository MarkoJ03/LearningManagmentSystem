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
import server.DTOs.KalendarDTO;
import server.model.Kalendar;
import server.service.KalendarService;

@Controller
@RequestMapping("/api/kalendari")
@Secured({"ROLE_ADMIN", "ROLE_STUDENTSKA_SLUZBA"})
public class KalendarController extends BaseController<Kalendar, KalendarDTO, Long> {

    @Autowired
    private KalendarService kalendarService;

    @Override
    protected KalendarService getService() {
        return kalendarService;
    }
    
    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN, ROLE_STUDENTSKA_SLUZBA, ROLE_NASTAVNIK"})
    public ResponseEntity<KalendarDTO> getOne(@PathVariable Long id) {
        Optional<KalendarDTO> entity = kalendarService.findById(id);
        return entity.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/nastavnik/{nastavnikId}")
    @Secured({"ROLE_ADMIN, ROLE_STUDENTSKA_SLUZBA, ROLE_NASTAVNIK"})
    public ResponseEntity<KalendarDTO> getKalendarByNastavnikId(@PathVariable Long nastavnikId) {
        try {
            KalendarDTO dto = kalendarService.findByNastavnikId(nastavnikId);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
