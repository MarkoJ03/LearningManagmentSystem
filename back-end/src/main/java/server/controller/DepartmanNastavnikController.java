package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.DepartmanNastavnikDTO;
import server.model.DepartmanNastavnik;
import server.service.DepartmanNastavnikService;


@Controller
@RequestMapping("/api/departman-nastavnik")
public class DepartmanNastavnikController extends BaseController<DepartmanNastavnik, DepartmanNastavnikDTO, Long> {

    @Autowired
    private DepartmanNastavnikService departmanNastavnikService;

    @Override
    protected DepartmanNastavnikService getService() {
        return departmanNastavnikService;
    }
}