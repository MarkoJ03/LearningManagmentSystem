package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.KalendarDTO;
import server.model.Kalendar;
import server.service.KalendarService;

@Controller
@RequestMapping("/api/kalendari")
public class KalendarController extends BaseController<Kalendar, KalendarDTO, Long> {

    @Autowired
    private KalendarService kalendarService;

    @Override
    protected KalendarService getService() {
        return kalendarService;
    }
    

    
    @GetMapping("/nastavnik/{nastavnikId}")
    public ResponseEntity<KalendarDTO> getKalendarByNastavnikId(@PathVariable Long nastavnikId) {
        try {
            KalendarDTO dto = kalendarService.findByNastavnikId(nastavnikId);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
