package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.AdresaDTO;
import server.DTOs.StudentDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.DTOs.SvObrazacDTO;
import server.model.Student;
import server.model.StudentNaGodini;
import server.model.SvObrazac;
import server.repository.SvObrazacRepository;

@Service
public class SvObrazacService extends BaseService<SvObrazac, SvObrazacDTO, Long> {

    @Autowired
    private SvObrazacRepository svObrazacRepository;

    @Autowired
    @Lazy
    private AdresaService aService;
    
    @Override
    protected CrudRepository<SvObrazac, Long> getRepository() {
        return svObrazacRepository;
    }

    @Override
    protected SvObrazacDTO convertToDTO(SvObrazac entity) {
        return new SvObrazacDTO(
            entity.getId(),
            entity.getMaternjiJezik(),
            entity.getVrstaZavreseneSrednje(),
            entity.getDatumZavrsetkaSrednje(),
            entity.getBracniStatus(),
            entity.getKontakt(),
            entity.getZaposlen(),
            entity.getNacinFinansiranja(),
            new StudentNaGodiniDTO(entity.getStudentNaGodini().getId(),entity.getStudentNaGodini().getBrojIndeksa(),null,
            		new StudentDTO(entity.getStudentNaGodini().getStudent().getId(),null,entity.getStudentNaGodini().getStudent().getIme(),entity.getStudentNaGodini().getStudent().getPrezime(),entity.getStudentNaGodini().getStudent().getJmbg(),
            		aService.convertToDTO(entity.getStudentNaGodini().getStudent().getAdresa()),null,null,entity.getStudentNaGodini().getStudent().getVidljiv()),
            		null,null,null,null,entity.getStudentNaGodini().getVidljiv()),
            null,
            entity.getVidljiv()
        );
    }

    @Override
    protected SvObrazac convertToEntity(SvObrazacDTO dto) {
        return new SvObrazac(
            dto.getId(),
            dto.getMaternjiJezik(),
            dto.getVrstaZavreseneSrednje(),
            dto.getDatumZavrsetkaSrednje(),
            dto.getBracniStatus(),
            dto.getKontakt(),
            dto.getZaposlen(),
            dto.getNacinFinansiranja(),
            new StudentNaGodini(dto.getStudentNaGodini().getId(),dto.getStudentNaGodini().getBrojIndeksa(),null,
            		new Student(dto.getStudentNaGodini().getStudent().getId(),null,dto.getStudentNaGodini().getStudent().getIme(),dto.getStudentNaGodini().getStudent().getPrezime(),dto.getStudentNaGodini().getStudent().getJmbg(),
            		aService.convertToEntity(dto.getStudentNaGodini().getStudent().getAdresa()),null,null,dto.getStudentNaGodini().getStudent().getVidljiv()),
            		null,null,null,null,dto.getStudentNaGodini().getVidljiv()),
            null,
            dto.getVidljiv()
        );
    }
}
