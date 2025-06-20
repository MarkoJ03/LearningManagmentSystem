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

import server.DTOs.FakultetDTO;
import server.model.Fakultet;
import server.service.FakultetService;


@Controller
@RequestMapping("/api/fakulteti")
public class FakultetController extends BaseController<Fakultet, FakultetDTO, Long> {

    @Autowired
    private FakultetService fakultetService;

    @Override
    protected FakultetService getService() {
        return fakultetService;
    }
    


}
