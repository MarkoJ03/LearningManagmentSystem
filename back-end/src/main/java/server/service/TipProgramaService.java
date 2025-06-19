package server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors; // Added for stream API

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.StudijskiProgramDTO;
import server.DTOs.TipProgramaDTO;
import server.model.StudijskiProgram;
import server.model.TipPrograma;
import server.repository.TipProgramaRepository;
import server.repository.StudijskiProgramRepository; // Assuming you have this repository

@Service
public class TipProgramaService extends BaseService<TipPrograma, TipProgramaDTO, Long> {

    @Autowired
    private TipProgramaRepository tipProgramaRepository;

    @Autowired
    @Lazy
    private StudijskiProgramService studijskiProgramService;

    @Autowired
    private StudijskiProgramRepository studijskiProgramRepository; 

    @Override
    protected CrudRepository<TipPrograma, Long> getRepository() {
        return tipProgramaRepository;
    }

    @Override
    protected TipProgramaDTO convertToDTO(TipPrograma entity) {
        
        List<StudijskiProgramDTO> studijskiProgramiDTO = new ArrayList<>();
        if (entity.getProgrami() != null) {
            studijskiProgramiDTO = entity.getProgrami().stream()
                    .map(sp -> {
                        
                        return new StudijskiProgramDTO(
                                sp.getId(),
                                sp.getNaziv(),
                                null, 
                                null, 
                                null, 
                                sp.getVidljiv()
                        );
                    })
                    .collect(Collectors.toList());
        }

        
        return new TipProgramaDTO(entity.getId(), entity.getNaziv(), studijskiProgramiDTO, entity.getVidljiv());
    }

    @Override
    protected TipPrograma convertToEntity(TipProgramaDTO dto) {
        TipPrograma tipPrograma = new TipPrograma();
        tipPrograma.setId(dto.getId()); 
        tipPrograma.setNaziv(dto.getNaziv());
        tipPrograma.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true);

        List<StudijskiProgram> studijskiProgrami = new ArrayList<>();
        if (dto.getProgrami() != null) {
            for (StudijskiProgramDTO spDTO : dto.getProgrami()) {
                if (spDTO.getId() != null) {
                    StudijskiProgram existingSp = studijskiProgramRepository.findById(spDTO.getId())
                            .orElseThrow(() -> new RuntimeException("StudijskiProgram with ID " + spDTO.getId() + " not found."));
                    
                    studijskiProgramService.updateEntityFromDto(spDTO, existingSp);
                    existingSp.setTipPrograma(tipPrograma); 
                    studijskiProgrami.add(existingSp);
                } else {
                    StudijskiProgram newSp = studijskiProgramService.convertToEntity(spDTO);
                    newSp.setTipPrograma(tipPrograma); 
                    studijskiProgrami.add(newSp);
                }
            }
        }
        tipPrograma.setProgrami(studijskiProgrami); 

        return tipPrograma;
    }

    @Override
    protected void updateEntityFromDto(TipProgramaDTO dto, TipPrograma entity) {
        
        entity.setNaziv(dto.getNaziv());
        entity.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true);

        
        List<StudijskiProgram> updatedProgrami = new ArrayList<>();
        if (dto.getProgrami() != null) {
            for (StudijskiProgramDTO spDTO : dto.getProgrami()) {
                if (spDTO.getId() != null) {
                    
                    studijskiProgramRepository.findById(spDTO.getId())
                            .ifPresent(sp -> {
                                studijskiProgramService.updateEntityFromDto(spDTO, sp); 
                                sp.setTipPrograma(entity); 
                                updatedProgrami.add(sp);
                            });
                } else {
                    
                    StudijskiProgram newSp = studijskiProgramService.convertToEntity(spDTO);
                    newSp.setTipPrograma(entity); 
                    updatedProgrami.add(newSp);
                }
            }
        }
        
        entity.getProgrami().clear();
        entity.getProgrami().addAll(updatedProgrami);
    }
}