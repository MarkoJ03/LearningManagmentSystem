package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.StudentNaGodiniDTO;
import server.model.StudentNaGodini;
import server.service.StudentNaGodiniService;

@Controller
@RequestMapping("/api/studenti-na-godini")
public class StudentNaGodiniController extends BaseController<StudentNaGodini, StudentNaGodiniDTO, Long> {

    @Autowired
    private StudentNaGodiniService studentNaGodiniService;

    @Override
    protected StudentNaGodiniService getService() {
        return studentNaGodiniService;
    }

}