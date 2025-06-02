package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.SilabusDTO;
import server.model.Silabus;
import server.service.SilabusService;

@Controller
@RequestMapping("/api/Silabus")
public class SilabusController extends BaseController<Silabus, SilabusDTO, Long> {

    @Autowired
    private SilabusService silabusService;

    @Override
    protected SilabusService getService() {
        return silabusService;
    }
}
