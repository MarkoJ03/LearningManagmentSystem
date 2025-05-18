package server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.GodinaStudijaDTO;
import server.model.GodinaStudija;
import server.service.GodinaStudijaService;


@Controller
@RequestMapping("/api/GodinaStudija")
public class GodinaStudijaController extends BaseController<GodinaStudija, GodinaStudijaDTO, Long> {

    @Autowired
    private GodinaStudijaService godinaStudijaService;

    @Override
    protected GodinaStudijaService getService() {
        return godinaStudijaService;
    }
    
    @GetMapping("/program/{id}")
    public ResponseEntity<List<GodinaStudijaDTO>> getByProgramId(@PathVariable Long id) {
        return ResponseEntity.ok(godinaStudijaService.findByStudijskiProgramId(id));
    }
}
