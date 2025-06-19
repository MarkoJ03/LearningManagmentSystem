package server.controller;

import java.util.List;
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

import org.springframework.web.bind.annotation.RestController;

import server.DTOs.ObjavaDTO;
import server.model.Objava;
import server.service.ObjavaService;

@Controller
@RequestMapping("/api/objave")

public class ObjavaController extends BaseController<Objava, ObjavaDTO, Long> {

    @Autowired
    private ObjavaService objavaService;

    @Override
    protected ObjavaService getService() {
        return objavaService;
    }
    
}
