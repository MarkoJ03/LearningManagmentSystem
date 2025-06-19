package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.StudentDTO;
import server.model.Student;
import server.service.StudentService;


@Controller
@RequestMapping("/api/studenti")
public class StudentController extends BaseController<Student, StudentDTO, Long> {

    @Autowired
    private StudentService studentService;

    @Override
    protected StudentService getService() {
        return studentService;
    }
    
}