package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.GradDTO;
import server.model.Grad;
import server.service.GradService;

@Controller
@RequestMapping("/api/Grad")
public class GradController extends BaseController<Grad, GradDTO, Long> {

    @Autowired
    private GradService gradService;

    @Override
    protected GradService getService() {
        return gradService;
    }

}
