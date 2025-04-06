package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.FakultetDTO;
import server.model.Fakultet;
import server.service.FakultetService;


@Controller
@RequestMapping("/api/Fakultet")
public class FakultetController extends BaseController<Fakultet, FakultetDTO, Long> {

    @Autowired
    private FakultetService fakultetService;

    @Override
    protected FakultetService getService() {
        return fakultetService;
    }
}
