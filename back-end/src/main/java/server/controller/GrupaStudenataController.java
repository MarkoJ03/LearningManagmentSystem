package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.GrupaStudenataDTO;
import server.model.GrupaStudenata;
import server.service.GrupaStudenataService;

@Controller
@RequestMapping("/api/grupe-studenata")
public class GrupaStudenataController extends BaseController<GrupaStudenata, GrupaStudenataDTO, Long> {

    @Autowired
    private GrupaStudenataService grupaStudenataService;

    @Override
    protected GrupaStudenataService getService() {
        return grupaStudenataService;
    }
    
}
