package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.DepartmanDTO;
import server.model.Departman;
import server.service.DepartmanService;


@Controller
@RequestMapping("/api/departmani")
public class DepartmanController extends BaseController<Departman, DepartmanDTO, Long> {

    @Autowired
    private DepartmanService departmanService;

    @Override
    protected DepartmanService getService() {
        return departmanService;
    }
}