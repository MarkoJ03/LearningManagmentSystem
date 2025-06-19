package server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors; // Dodato za stream API

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.GodinaStudijaDTO;
import server.DTOs.KatedraDTO;
import server.DTOs.StudijskiProgramDTO;
import server.DTOs.TipProgramaDTO;
import server.model.GodinaStudija;
import server.model.Katedra;
import server.model.StudijskiProgram;
import server.model.TipPrograma;
import server.repository.KatedraRepository; // Dodato
import server.repository.StudijskiProgramRepository;
import server.repository.TipProgramaRepository; // Dodato

@Service
public class StudijskiProgramService extends BaseService<StudijskiProgram, StudijskiProgramDTO, Long>{

    @Autowired
    private StudijskiProgramRepository studijskiProgramRepository;

    @Autowired
    private TipProgramaRepository tipProgramaRepository; 
    
    @Autowired
    private KatedraRepository katedraRepository; 

    @Autowired
    @Lazy 
    private GodinaStudijaService godinaStudijaService;

    @Override
    protected CrudRepository<StudijskiProgram, Long> getRepository() {
        return studijskiProgramRepository;
    }

    @Override
    protected StudijskiProgramDTO convertToDTO(StudijskiProgram entity) {
        
        TipProgramaDTO tipProgramaDTO = null;
        if (entity.getTipPrograma() != null) {
            tipProgramaDTO = new TipProgramaDTO(
                entity.getTipPrograma().getId(),
                entity.getTipPrograma().getNaziv(),
                null, 
                entity.getTipPrograma().getVidljiv()
            );
        }

       
        KatedraDTO katedraDTO = null;
        if (entity.getKatedra() != null) {
            katedraDTO = new KatedraDTO(
                entity.getKatedra().getId(),
                entity.getKatedra().getNaziv(),
                null, null, null, null, null, 
                entity.getKatedra().getVidljiv()
            );
        }

       
        List<GodinaStudijaDTO> godineStudijaDTO = new ArrayList<>();
        if (entity.getGodineStudija() != null) {
            for (GodinaStudija gs : entity.getGodineStudija()) {
                
                GodinaStudijaDTO gsDTO = godinaStudijaService.convertToDTO(gs);
                godineStudijaDTO.add(gsDTO);
            }
        }

        return new StudijskiProgramDTO(
            entity.getId(),
            entity.getNaziv(),
            tipProgramaDTO, 
            katedraDTO,     
            godineStudijaDTO,
            entity.getVidljiv()
        );
    }

    @Override
    protected StudijskiProgram convertToEntity(StudijskiProgramDTO dto) {
        StudijskiProgram studijskiProgram = new StudijskiProgram();
        studijskiProgram.setId(dto.getId()); 
        studijskiProgram.setNaziv(dto.getNaziv());
        studijskiProgram.setVidljiv(dto.getVidljiv());

        
        if (dto.getTipPrograma() != null && dto.getTipPrograma().getId() != null) {
            TipPrograma existingTipPrograma = tipProgramaRepository.findById(dto.getTipPrograma().getId())
                .orElseThrow(() -> new RuntimeException("TipPrograma sa ID " + dto.getTipPrograma().getId() + " nije pronađen."));
            studijskiProgram.setTipPrograma(existingTipPrograma);
        } else {
            studijskiProgram.setTipPrograma(null);
        }

        
        if (dto.getKatedra() != null && dto.getKatedra().getId() != null) {
            Katedra existingKatedra = katedraRepository.findById(dto.getKatedra().getId())
                .orElseThrow(() -> new RuntimeException("Katedra sa ID " + dto.getKatedra().getId() + " nije pronađena."));
            studijskiProgram.setKatedra(existingKatedra);
        } else {
            studijskiProgram.setKatedra(null);
        }

        
        List<GodinaStudija> godineStudija = new ArrayList<>();
        if (dto.getGodineStudija() != null) {
            for (GodinaStudijaDTO gsDTO : dto.getGodineStudija()) {
                
                GodinaStudija gs = godinaStudijaService.convertToEntity(gsDTO);
                gs.setStudijskiProgram(studijskiProgram); 
                godineStudija.add(gs);
            }
        }
        studijskiProgram.setGodineStudija(godineStudija);

        return studijskiProgram;
    }

    @Override
    protected void updateEntityFromDto(StudijskiProgramDTO dto, StudijskiProgram entity) {
        
        entity.setNaziv(dto.getNaziv());
        entity.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true); 

        
        if (dto.getTipPrograma() != null && dto.getTipPrograma().getId() != null) {
            TipPrograma existingTipPrograma = tipProgramaRepository.findById(dto.getTipPrograma().getId())
                .orElseThrow(() -> new RuntimeException("TipPrograma sa ID " + dto.getTipPrograma().getId() + " nije pronađen za ažuriranje."));
            entity.setTipPrograma(existingTipPrograma);
        } else {
            
            entity.setTipPrograma(null);
        }

        
        if (dto.getKatedra() != null && dto.getKatedra().getId() != null) {
            Katedra existingKatedra = katedraRepository.findById(dto.getKatedra().getId())
                .orElseThrow(() -> new RuntimeException("Katedra sa ID " + dto.getKatedra().getId() + " nije pronađena za ažuriranje."));
            entity.setKatedra(existingKatedra);
        } else {
            
            entity.setKatedra(null);
        }

        List<GodinaStudija> updatedGodineStudija = new ArrayList<>();
        if (dto.getGodineStudija() != null) {
            for (GodinaStudijaDTO gsDTO : dto.getGodineStudija()) {
                if (gsDTO.getId() != null) {
                   
                    godinaStudijaService.getRepository().findById(gsDTO.getId())
                        .ifPresent(gs -> {
                            
                            godinaStudijaService.updateEntityFromDto(gsDTO, gs);
                            gs.setStudijskiProgram(entity); 
                            updatedGodineStudija.add(gs);
                        });
                } else {
                    
                    GodinaStudija newGs = godinaStudijaService.convertToEntity(gsDTO);
                    newGs.setStudijskiProgram(entity); 
                    updatedGodineStudija.add(newGs);
                }
            }
        }
        
        
        entity.getGodineStudija().clear();
        entity.getGodineStudija().addAll(updatedGodineStudija);
    }
}