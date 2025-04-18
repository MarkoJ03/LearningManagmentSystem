package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.KatedraNastavnikDTO;
import server.model.KatedraNastavnik;
import server.service.KatedraNastavnikService;


@Controller
@RequestMapping("/api/KatedraNastavnik")
public class KatedraNastavnikController extends BaseController<KatedraNastavnik, KatedraNastavnikDTO, Long> {

    @Autowired
    private KatedraNastavnikService katedraNastavnikService;

    @Override
    protected KatedraNastavnikService getService() {
        return katedraNastavnikService;
    }
}