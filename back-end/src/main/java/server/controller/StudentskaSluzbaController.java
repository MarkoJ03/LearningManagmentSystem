package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import server.DTOs.StudentskaSluzbaDTO;
import server.model.StudentskaSluzba;
import server.service.StudentskaSluzbaService;

@Controller
@RequestMapping("/api/studentske-sluzbe")
public class StudentskaSluzbaController extends BaseController<StudentskaSluzba, StudentskaSluzbaDTO, Long> {

    @Autowired
    private StudentskaSluzbaService studentskaSluzbaService;

    @Override
    protected StudentskaSluzbaService getService() {
        return studentskaSluzbaService;
    }
}
