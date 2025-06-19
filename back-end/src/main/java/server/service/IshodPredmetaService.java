package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import server.DTOs.IshodEvaluacijeDTO;
import server.DTOs.IshodPredmetaDTO;
import server.DTOs.RealizacijaPredmetaDTO;
import server.model.IshodEvaluacije;
import server.model.IshodPredmeta;
import server.model.RealizacijaPredmeta;
import server.repository.IshodEvaluacijeRepository;
import server.repository.IshodPredmetaRepository;
import server.repository.RealizacijaPredmetaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class IshodPredmetaService extends BaseService<IshodPredmeta, IshodPredmetaDTO, Long> {

    @Autowired
    private IshodPredmetaRepository ishodPredmetaRepository;

    @Autowired
    private RealizacijaPredmetaRepository realizacijaPredmetaRepository;

    @Autowired
    private IshodEvaluacijeRepository ishodEvaluacijeRepository;

    @Override
    protected CrudRepository<IshodPredmeta, Long> getRepository() {
        return ishodPredmetaRepository;
    }

    @Override
    protected IshodPredmetaDTO convertToDTO(IshodPredmeta entity) {
        
        List<RealizacijaPredmetaDTO> realizacijeDTO = new ArrayList<>();
        for (RealizacijaPredmeta r : entity.getRealizacijePredmeta()) {
            realizacijeDTO.add(new RealizacijaPredmetaDTO(
                r.getId(), null, null, null, null, null, r.getVidljiv()
            ));
        }

        
        List<IshodEvaluacijeDTO> ishodiDTO = new ArrayList<>();
        for (IshodEvaluacije ie : entity.getIshodiEvaluacije()) {
            ishodiDTO.add(new IshodEvaluacijeDTO(
                ie.getId(), null, null, null, null, null, null
            ));
        }

        
        return new IshodPredmetaDTO(
            entity.getId(),
            entity.getOcena(),
            realizacijeDTO,
            ishodiDTO,
            entity.getVidljiv()
        );
    }

    @Override
    protected IshodPredmeta convertToEntity(IshodPredmetaDTO dto) {
        IshodPredmeta entity = new IshodPredmeta();
        entity.setId(dto.getId());
        entity.setOcena(dto.getOcena());
        entity.setVidljiv(dto.getVidljiv());

       
        List<RealizacijaPredmeta> realizacije = new ArrayList<>();
        if (dto.getRealizacijePredmeta() != null) {
            for (RealizacijaPredmetaDTO rDTO : dto.getRealizacijePredmeta()) {
                if (rDTO.getId() != null) {
                    Optional<RealizacijaPredmeta> rOpt = realizacijaPredmetaRepository.findById(rDTO.getId());
                    rOpt.ifPresent(rp -> {
                        rp.setIshodPredmeta(entity); 
                        realizacije.add(rp);
                    });
                }
            }
        }
        entity.setRealizacijePredmeta(realizacije);

        
        List<IshodEvaluacije> ishodi = new ArrayList<>();
        if (dto.getIshodiEvaluacije() != null) {
            for (IshodEvaluacijeDTO ieDTO : dto.getIshodiEvaluacije()) {
                if (ieDTO.getId() != null) {
                    Optional<IshodEvaluacije> ieOpt = ishodEvaluacijeRepository.findById(ieDTO.getId());
                    ieOpt.ifPresent(ie -> {
                        ie.setIshodPredmeta(entity); 
                        ishodi.add(ie);
                    });
                }
            }
        }
        entity.setIshodiEvaluacije(ishodi);

        return entity;
    }

    @Override
    protected void updateEntityFromDto(IshodPredmetaDTO dto, IshodPredmeta entity) {
        entity.setOcena(dto.getOcena());
        entity.setVidljiv(dto.getVidljiv());

        
        List<RealizacijaPredmeta> updatedRealizacije = new ArrayList<>();
        if (dto.getRealizacijePredmeta() != null) {
            for (RealizacijaPredmetaDTO rDTO : dto.getRealizacijePredmeta()) {
                if (rDTO.getId() != null) {
                    realizacijaPredmetaRepository.findById(rDTO.getId())
                        .ifPresent(r -> {
                            r.setIshodPredmeta(entity);
                            updatedRealizacije.add(r);
                        });
                }
            }
        }
        entity.getRealizacijePredmeta().clear();
        entity.getRealizacijePredmeta().addAll(updatedRealizacije);

       
        List<IshodEvaluacije> updatedIshodi = new ArrayList<>();
        if (dto.getIshodiEvaluacije() != null) {
            for (IshodEvaluacijeDTO ieDTO : dto.getIshodiEvaluacije()) {
                if (ieDTO.getId() != null) {
                    ishodEvaluacijeRepository.findById(ieDTO.getId())
                        .ifPresent(ie -> {
                            ie.setIshodPredmeta(entity);
                            updatedIshodi.add(ie);
                        });
                }
            }
        }
        entity.getIshodiEvaluacije().clear();
        entity.getIshodiEvaluacije().addAll(updatedIshodi);
    }
}
