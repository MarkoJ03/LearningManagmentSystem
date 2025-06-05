package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import server.DTOs.GrupaStudenataDTO;
import server.DTOs.KalendarDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.model.GrupaStudenata;
import server.repository.GrupaStudenataRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GrupaStudenataService extends BaseService<GrupaStudenata, GrupaStudenataDTO, Long> {

    @Autowired
    private GrupaStudenataRepository grupaStudenataRepository;

    @Override
    protected CrudRepository<GrupaStudenata, Long> getRepository() {
        return grupaStudenataRepository;
    }

    @Override
    protected GrupaStudenataDTO convertToDTO(GrupaStudenata entity) {
        List<StudentNaGodiniDTO> studenti = null;
        if (entity.getStudentNaGodini() != null && !entity.getStudentNaGodini().isEmpty()) {
            studenti = entity.getStudentNaGodini().stream()
                    .map(studentNaGodini -> {
                        StudentNaGodiniDTO dto = new StudentNaGodiniDTO();
                        dto.setId(studentNaGodini.getId());
                        dto.setBrojIndeksa(studentNaGodini.getBrojIndeksa());
                        dto.setVidljiv(studentNaGodini.getVidljiv());
                        return dto;
                    })
                    .collect(Collectors.toList());
        }

        KalendarDTO kalendar = null;
        if (entity.getKalendar() != null) {
            kalendar = new KalendarDTO();
            kalendar.setId(entity.getKalendar().getId());
            kalendar.setVidljiv(entity.getKalendar().getVidljiv());
        }

        GrupaStudenataDTO dto = new GrupaStudenataDTO();
        dto.setId(entity.getId());
        dto.setStudentNaGodini(studenti);
        dto.setKalendar(kalendar);
        dto.setVidljiv(entity.getVidljiv());
        

        return dto;
    }
    

    @Override
    protected GrupaStudenata convertToEntity(GrupaStudenataDTO dto) {
       
        GrupaStudenata entity = new GrupaStudenata();
        entity.setId(dto.getId());
        entity.setVidljiv(dto.getVidljiv());
       
        return entity;
    }
}
