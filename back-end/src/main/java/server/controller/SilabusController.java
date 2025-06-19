package server.controller;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import server.DTOs.SilabusDTO;
import server.DTOs.SilabusTerminDTO;
import server.DTOs.TerminXmlDTO;

import server.DTOs.NastavnikXmlDTO;
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

        List<TerminXmlDTO> terminiXml = new ArrayList<>();

        for (SilabusTerminDTO termin : silabus.getTermini()) {
            TerminXmlDTO terminXml = new TerminXmlDTO();
            terminXml.setDatum(termin.getDatum().toString());
            terminXml.setMaterijal(termin.getMaterijal());
            terminXml.setCilj(termin.getCilj());
            terminXml.setOpis(termin.getOpis());

            NastavnikXmlDTO nastavnikXml = new NastavnikXmlDTO();
            nastavnikXml.setIme(termin.getNastavnik().getIme());
            nastavnikXml.setPrezime(termin.getNastavnik().getPrezime());
            terminXml.setNastavnik(nastavnikXml);

            terminiXml.add(terminXml);
        }

        SilabusXmlDTO exportXml = new SilabusXmlDTO();
        exportXml.setTermini(terminiXml);

        XmlMapper xmlMapper = new XmlMapper();

        xmlMapper.enable(SerializationFeature.INDENT_OUTPUT);

        String xml = xmlMapper.writeValueAsString(exportXml);
        return ResponseEntity.ok(xml);
    }


    @Override
    protected SilabusService getService() {
        return silabusService;
    }

}
