package server.service;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.TipEvaluacijeDTO;
import server.model.TipEvaluacije;
import server.model.EvaluacijaZnanja;
import server.DTOs.EvaluacijaZnanjaDTO;
import server.repository.TipEvaluacijeRepository;

@Service
public class TipEvaluacijeService extends BaseService<TipEvaluacije, TipEvaluacijeDTO, Long>{
	@Autowired
    private TipEvaluacijeRepository tipEvaluacijeRepository;

    @Autowired
    @Lazy
    private EvaluacijaZnanjaService evaluacijaZnanjaService;

    @Override
    protected CrudRepository<TipEvaluacije, Long> getRepository() {
        return tipEvaluacijeRepository;
    }

    @Override
    protected TipEvaluacijeDTO convertToDTO(TipEvaluacije entity) {
        List<EvaluacijaZnanjaDTO> evaluacijeZnanjaDTOs = null;
        if (entity.getEvaluacijeZnanja() != null) {
            evaluacijeZnanjaDTOs = entity.getEvaluacijeZnanja().stream()
                .map(evaluacijaZnanjaService::convertToDTO)
                .collect(Collectors.toList());
        }
        return new TipEvaluacijeDTO(
            entity.getId(),
            entity.getNaziv(),
            evaluacijeZnanjaDTOs,
            entity.getVidljiv()
        );
    }

    @Override
    protected TipEvaluacije convertToEntity(TipEvaluacijeDTO dto) {
        List<EvaluacijaZnanja> evaluacijeZnanjaEntities = null;
        if (dto.getEvaluacijeZnanja() != null) {
            evaluacijeZnanjaEntities = dto.getEvaluacijeZnanja().stream()
                .map(evaluacijaZnanjaService::convertToEntity)
                .collect(Collectors.toList());
        }
        return new TipEvaluacije(
            dto.getId(),
            dto.getNaziv(),
            evaluacijeZnanjaEntities,
            dto.getVidljiv()
        );
    }

    
}
