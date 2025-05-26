package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.UniverzitetDTO;
import server.model.Univerzitet;
import server.service.UniverzitetService;


@Controller
@RequestMapping("/api/univerziteti")
public class UniverzitetController extends BaseController<Univerzitet, UniverzitetDTO, Long> {

    @Autowired
    private UniverzitetService univerzitetService;

    @Override
    protected UniverzitetService getService() {
        return univerzitetService;
    }
    
/////////////////  getAll, getById svi @PermitAll
}