package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.IspitniRokDTO;
import server.model.IspitniRok;
import server.service.IspitniRokService;

@Controller
@RequestMapping("/api/IspitniRok")
public class IspitniRokController extends BaseController<IspitniRok, IspitniRokDTO, Long> {

    @Autowired
    private IspitniRokService ispitniRokService;

    @Override
    protected IspitniRokService getService() {
        return ispitniRokService;
    }
}
