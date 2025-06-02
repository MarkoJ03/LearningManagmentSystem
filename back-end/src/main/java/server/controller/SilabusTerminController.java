package server.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.SilabusTerminDTO;
import server.model.SilabusTermin;
import server.service.SilabusTerminService;

@Controller
@RequestMapping("/api/SilabusTermin")
public class SilabusTerminController extends BaseController<SilabusTermin, SilabusTerminDTO, Long> {

    @Autowired
    private SilabusTerminService silabusTerminService;

    @Override
    protected SilabusTerminService getService() {
        return silabusTerminService;
    }
}