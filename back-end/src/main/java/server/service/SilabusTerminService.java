package server.service;

import java.time.LocalDate; 
import java.util.Optional; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.NastavnikDTO; 
import server.DTOs.SilabusDTO;   
import server.DTOs.SilabusTerminDTO;
import server.model.Nastavnik;   
import server.model.Silabus;    
import server.model.SilabusTermin;
import server.repository.NastavnikRepository; 
import server.repository.SilabusRepository;   
import server.repository.SilabusTerminRepository;

@Service
public class SilabusTerminService extends BaseService<SilabusTermin, SilabusTerminDTO, Long> {

    @Autowired
    private SilabusTerminRepository silabusTerminRepository;

    @Autowired
    @Lazy
    private SilabusService silabusService;

    @Autowired
    @Lazy
    private NastavnikService nastavnikService;

    @Autowired
    private NastavnikRepository nastavnikRepository;

    @Autowired
    private SilabusRepository silabusRepository;


    @Override
    protected CrudRepository<SilabusTermin, Long> getRepository() {
        return silabusTerminRepository;
    }

    @Override
    protected SilabusTerminDTO convertToDTO(SilabusTermin entity) {
        SilabusDTO silabusDTO = null;
        if (entity.getSilabus() != null) {
          
            silabusDTO = new SilabusDTO(entity.getSilabus().getId(), null, entity.getSilabus().getVidljiv());
        }

        NastavnikDTO nastavnikDTO = null;
        if (entity.getNastavnik() != null) {
            nastavnikDTO = new NastavnikDTO(entity.getNastavnik().getId(),null, entity.getNastavnik().getIme(), entity.getNastavnik().getPrezime(), null,null,null,null,null,null,null);
        }

        return new SilabusTerminDTO(
                entity.getId(),
                entity.getDatum(),
                entity.getMaterijal(),
                entity.getCilj(),
                entity.getOpis(),
                nastavnikDTO, 
                silabusDTO,   
                entity.getVidljiv()
        );
    }

    @Override
    protected SilabusTermin convertToEntity(SilabusTerminDTO dto) {
        SilabusTermin silabusTermin = new SilabusTermin();

        silabusTermin.setId(dto.getId()); 
        silabusTermin.setDatum(dto.getDatum());
        silabusTermin.setMaterijal(dto.getMaterijal());
        silabusTermin.setCilj(dto.getCilj());
        silabusTermin.setOpis(dto.getOpis());
        silabusTermin.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true);

        if (dto.getNastavnik() != null && dto.getNastavnik().getId() != null) {
            Nastavnik existingNastavnik = nastavnikRepository.findById(dto.getNastavnik().getId())
                    .orElseThrow(() -> new RuntimeException("Nastavnik with ID " + dto.getNastavnik().getId() + " not found."));
            silabusTermin.setNastavnik(existingNastavnik);
        } else {
           
             throw new IllegalArgumentException("Nastavnik ID must be provided for SilabusTermin.");
        }


        if (dto.getSilabus() != null && dto.getSilabus().getId() != null) {
            Silabus existingSilabus = silabusRepository.findById(dto.getSilabus().getId())
                    .orElseThrow(() -> new RuntimeException("Silabus with ID " + dto.getSilabus().getId() + " not found."));
            silabusTermin.setSilabus(existingSilabus);
        } else {
            throw new IllegalArgumentException("Silabus ID must be provided for SilabusTermin.");
        }

        return silabusTermin;
    }

    @Override
    protected void updateEntityFromDto(SilabusTerminDTO dto, SilabusTermin entity) {
        entity.setDatum(dto.getDatum());
        entity.setMaterijal(dto.getMaterijal());
        entity.setCilj(dto.getCilj());
        entity.setOpis(dto.getOpis());
        entity.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true);

        if (dto.getNastavnik() != null && dto.getNastavnik().getId() != null) {
            Nastavnik nastavnik = new Nastavnik();
            nastavnik.setId(dto.getNastavnik().getId());
            entity.setNastavnik(nastavnik);
        } else {
             throw new IllegalArgumentException("Nastavnik ID must be provided for updating SilabusTermin.");
        }

        if (dto.getSilabus() != null && dto.getSilabus().getId() != null) {
            Silabus silabus = new Silabus();
            silabus.setId(dto.getSilabus().getId());
            entity.setSilabus(silabus);
        } else {
            throw new IllegalArgumentException("Silabus ID must be provided for updating SilabusTermin.");
        }
    }
}