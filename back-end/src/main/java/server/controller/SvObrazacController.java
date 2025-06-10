package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import server.DTOs.StudentNaGodiniDTO;
import server.DTOs.SvObrazacDTO;
import server.DTOs.SvObrazacXmlDTO;
import server.model.SvObrazac;
import server.service.SvObrazacService;

@Controller
@RequestMapping("/api/sv-obrazac")
@Secured({"ROLE_ADMIN, ROLE_STUDENTSKA_SLUZBA, ROLE_STUDENT"})
public class SvObrazacController extends BaseController<SvObrazac, SvObrazacDTO, Long> {

    @Autowired
    private SvObrazacService svObrazacService;

    @Override
    protected SvObrazacService getService() {
        return svObrazacService;
    }
    
    @GetMapping(value = "/{id}/xml", produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<String> exportToXml(@PathVariable Long id) throws Exception {
        SvObrazacDTO dto = svObrazacService.findById(id).orElse(null);
        if (dto == null || dto.getStudentNaGodini() == null || dto.getStudentNaGodini().getStudent() == null) {
            return ResponseEntity.notFound().build(); 
        }

        StudentNaGodiniDTO sng = dto.getStudentNaGodini();

        SvObrazacXmlDTO exportDTO = new SvObrazacXmlDTO();

        exportDTO.setIme(sng.getStudent().getIme());
        exportDTO.setPrezime(sng.getStudent().getPrezime());
        exportDTO.setBrojIndeksa(sng.getBrojIndeksa());
        exportDTO.setJmbg(sng.getStudent().getJmbg());

        exportDTO.setMaternjiJezik(dto.getMaternjiJezik());
        exportDTO.setVrstaZavreseneSrednje(dto.getVrstaZavreseneSrednje());
        exportDTO.setDatumZavrsetkaSrednje(dto.getDatumZavrsetkaSrednje());

        exportDTO.setBracniStatus(dto.getBracniStatus() ? "Oženjen/Udata" : "Neoženjen/Neudata");
        exportDTO.setKontakt(dto.getKontakt());

        exportDTO.setAdresaUlica(sng.getStudent().getAdresa().getUlica());
        exportDTO.setAdresaBroj(sng.getStudent().getAdresa().getBroj());
        exportDTO.setAdresaGrad(sng.getStudent().getAdresa().getGrad().getNaziv());
        exportDTO.setAdresaDrzava(sng.getStudent().getAdresa().getGrad().getDrzava().getNaziv());

        exportDTO.setZaposlen(dto.getZaposlen() ? "Da" : "Ne");
        exportDTO.setNacinFinansiranja(dto.getNacinFinansiranja() ? "Budžet" : "Samofinansiranje");

        XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.registerModule(new JavaTimeModule());
        xmlMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        xmlMapper.enable(SerializationFeature.INDENT_OUTPUT);

        String xml = xmlMapper.writeValueAsString(exportDTO);
        return ResponseEntity.ok(xml);
    }

}