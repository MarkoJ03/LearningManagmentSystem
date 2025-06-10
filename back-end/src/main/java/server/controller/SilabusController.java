package server.controller;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.DTOs.SilabusDTO;
import server.DTOs.SilabusTerminDTO;
import server.DTOs.SilabusTerminXmlDTO;
import server.DTOs.SilabusXmlDTO;
import server.model.Silabus;
import server.service.SilabusService;

@Controller
@RequestMapping("/api/Silabus")
public class SilabusController extends BaseController<Silabus, SilabusDTO, Long> {

    @Autowired
    private SilabusService silabusService;

    @GetMapping(value = "/{id}/xml", produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<String> exportSilabusXml(@PathVariable Long id) throws Exception {
        SilabusDTO silabus = silabusService.findById(id).orElse(null);

        List<SilabusTerminXmlDTO> terminDtoList = new ArrayList<>();
        for (SilabusTerminDTO termin : silabus.getTermini()) {
            String nastavnikImePrezime = termin.getNastavnik().getIme() + " " + termin.getNastavnik().getPrezime();
            SilabusTerminXmlDTO dto = new SilabusTerminXmlDTO(
                termin.getDatum(),
                termin.getMaterijal(),
                termin.getCilj(),
                termin.getOpis(),
                nastavnikImePrezime
            );
            terminDtoList.add(dto);
        }

        SilabusXmlDTO exportDto = new SilabusXmlDTO(terminDtoList);

        XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.registerModule(new JavaTimeModule());
        xmlMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        xmlMapper.enable(SerializationFeature.INDENT_OUTPUT);

        String xml = xmlMapper.writeValueAsString(exportDto);
        return ResponseEntity.ok(xml);
    }


    @Override
    protected SilabusService getService() {
        return silabusService;
    }
}
