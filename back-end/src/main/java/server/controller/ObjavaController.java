package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.ObjavaDTO;
import server.model.Objava;
import server.service.ObjavaService;

@Controller
@RequestMapping("/api/Objava")
public class ObjavaController extends BaseController<Objava, ObjavaDTO, Long> {

    @Autowired
    private ObjavaService objavaService;

    @Override
    protected ObjavaService getService() {
        return objavaService;
    }
}
