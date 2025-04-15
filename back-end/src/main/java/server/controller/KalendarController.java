package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.KalendarDTO;
import server.model.Kalendar;
import server.service.KalendarService;

@Controller
@RequestMapping("/api/Kalendar")
public class KalendarController extends BaseController<Kalendar, KalendarDTO, Long> {

    @Autowired
    private KalendarService kalendarService;

    @Override
    protected KalendarService getService() {
        return kalendarService;
    }
}
