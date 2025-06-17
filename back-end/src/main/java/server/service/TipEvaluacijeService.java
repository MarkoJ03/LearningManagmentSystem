package server.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import server.DTOs.TipEvaluacijeDTO;
import server.model.TipEvaluacije;
import server.model.EvaluacijaZnanja;
import server.DTOs.EvaluacijaZnanjaDTO;
import server.repository.EvaluacijaZnanjaRepository;
import server.repository.TipEvaluacijeRepository;

@Service
public class TipEvaluacijeService extends BaseService<TipEvaluacije, TipEvaluacijeDTO, Long> {
	@Autowired
	private TipEvaluacijeRepository tipEvaluacijeRepository;

	@Autowired
	@Lazy
	private EvaluacijaZnanjaService evaluacijaZnanjaService;

	@Autowired
	private EvaluacijaZnanjaRepository evaluacijaZnanjaRepository;

	@Override
	protected CrudRepository<TipEvaluacije, Long> getRepository() {
		return tipEvaluacijeRepository;
	}

	@Override
	protected TipEvaluacijeDTO convertToDTO(TipEvaluacije entity) {
		List<EvaluacijaZnanjaDTO> evaluacijeZnanjaDTOs = null;
		if (entity.getEvaluacijeZnanja() != null) {
			evaluacijeZnanjaDTOs = entity.getEvaluacijeZnanja().stream().map(evaluacijaZnanjaService::convertToDTO)
					.collect(Collectors.toList());
		}
		return new TipEvaluacijeDTO(entity.getId(), entity.getNaziv(), evaluacijeZnanjaDTOs, entity.getVidljiv());
	}

//    @Override
//    protected TipEvaluacije convertToEntity(TipEvaluacijeDTO dto) {
//        List<EvaluacijaZnanja> evaluacijeZnanjaEntities = null;
//        if (dto.getEvaluacijeZnanja() != null) {
//            evaluacijeZnanjaEntities = dto.getEvaluacijeZnanja().stream()
//                .map(evaluacijaZnanjaService::convertToEntity)
//                .collect(Collectors.toList());
//        }
//        return new TipEvaluacije(
//            dto.getId(),
//            dto.getNaziv(),
//            evaluacijeZnanjaEntities,
//            dto.getVidljiv()
//        );
//    }

	@Override
	protected TipEvaluacije convertToEntity(TipEvaluacijeDTO dto) {
		TipEvaluacije tipEvaluacije = new TipEvaluacije(dto.getId(), dto.getNaziv(), null, dto.getVidljiv());

		if (dto.getEvaluacijeZnanja() != null) {
			List<EvaluacijaZnanja> evaluacijeZnanjaEntities = dto.getEvaluacijeZnanja().stream()
					.map(evaluacijaZnanjaDTO -> {
						EvaluacijaZnanja evaluacijaZnanja = evaluacijaZnanjaRepository
								.findById(evaluacijaZnanjaDTO.getId()).orElseThrow(() -> new RuntimeException(
										"EvaluacijaZnanja sa ID " + evaluacijaZnanjaDTO.getId() + " ne postoji."));

						evaluacijaZnanja.setTipEvaluacije(tipEvaluacije);
						return evaluacijaZnanja;
					}).collect(Collectors.toList());
			tipEvaluacije.setEvaluacijeZnanja(evaluacijeZnanjaEntities);
		}
		return tipEvaluacije;
	}

	@Override
    @Transactional 
    protected void updateEntityFromDto(TipEvaluacijeDTO dto, TipEvaluacije entity) {
        if (dto.getNaziv() != null) {
            entity.setNaziv(dto.getNaziv());
        }
        if (dto.getVidljiv() != null) {
            entity.setVidljiv(dto.getVidljiv());
        }

        if (dto.getEvaluacijeZnanja() != null) {
            Set<Long> currentEvaluacijaZnanjaIds = entity.getEvaluacijeZnanja().stream()
                .map(EvaluacijaZnanja::getId)
                .collect(Collectors.toCollection(HashSet::new)); // Use HashSet for efficient lookup

            Set<Long> dtoEvaluacijaZnanjaIds = dto.getEvaluacijeZnanja().stream()
                .filter(ezDto -> ezDto.getId() != null) // Only consider DTOs with IDs for existing entities
                .map(EvaluacijaZnanjaDTO::getId)
                .collect(Collectors.toCollection(HashSet::new));

            List<EvaluacijaZnanja> toRemove = entity.getEvaluacijeZnanja().stream()
                .filter(ez -> !dtoEvaluacijaZnanjaIds.contains(ez.getId()))
                .collect(Collectors.toList());

            for (EvaluacijaZnanja ez : toRemove) {
                evaluacijaZnanjaRepository.delete(ez);
            }
            entity.getEvaluacijeZnanja().removeAll(toRemove);

            List<EvaluacijaZnanja> newEvaluacijeZnanjaCollection = new java.util.ArrayList<>();

            for (EvaluacijaZnanjaDTO evaluacijaZnanjaDTO : dto.getEvaluacijeZnanja()) {
                EvaluacijaZnanja evaluacijaZnanja;

                if (evaluacijaZnanjaDTO.getId() == null) {
                    evaluacijaZnanja = evaluacijaZnanjaService.convertToEntity(evaluacijaZnanjaDTO);
                    evaluacijaZnanja.setTipEvaluacije(entity); // Set the parent immediately
                    evaluacijaZnanja = evaluacijaZnanjaRepository.save(evaluacijaZnanja); // Save the new entity
                } else {
                    evaluacijaZnanja = evaluacijaZnanjaRepository.findById(evaluacijaZnanjaDTO.getId())
                        .orElseThrow(() -> new RuntimeException("EvaluacijaZnanja sa ID " + evaluacijaZnanjaDTO.getId() + " ne postoji."));

                    evaluacijaZnanja.setTipEvaluacije(entity);
                }
                newEvaluacijeZnanjaCollection.add(evaluacijaZnanja);
            }

            entity.setEvaluacijeZnanja(newEvaluacijeZnanjaCollection);

        } else {
            if (entity.getEvaluacijeZnanja() != null && !entity.getEvaluacijeZnanja().isEmpty()) {
                evaluacijaZnanjaRepository.deleteAll(entity.getEvaluacijeZnanja());
                entity.getEvaluacijeZnanja().clear(); // Clear the collection in the entity
            }
        }
    }
}
