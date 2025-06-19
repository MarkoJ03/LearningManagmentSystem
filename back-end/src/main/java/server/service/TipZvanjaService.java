package server.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import server.DTOs.TipZvanjaDTO;
import server.DTOs.ZvanjeDTO;
import server.model.TipZvanja;
import server.model.Zvanje;
import server.repository.TipZvanjaRepository;
import server.repository.ZvanjeRepository;

@Service
public class TipZvanjaService extends BaseService<TipZvanja, TipZvanjaDTO, Long> {

	@Autowired
	private TipZvanjaRepository tipZvanjaRepository;

	@Autowired
	@Lazy
	private ZvanjeService zvanjeService;
	
	@Autowired
	private ZvanjeRepository zvanjeRepository;

	@Override
	protected CrudRepository<TipZvanja, Long> getRepository() {
		return tipZvanjaRepository;
	}

	@Override
	protected TipZvanjaDTO convertToDTO(TipZvanja entity) {
		ArrayList<ZvanjeDTO> zvanja = new ArrayList<>();
		if (entity.getZvanja() != null) {
			for (Zvanje z : entity.getZvanja()) {
				ZvanjeDTO zDTO = zvanjeService.convertToDTO(z);
				zvanja.add(zDTO);
			}
		}
		return new TipZvanjaDTO(entity.getId(), entity.getNaziv(), zvanja, entity.getVidljiv());
	}

	@Override
	protected TipZvanja convertToEntity(TipZvanjaDTO dto) {
		TipZvanja tipZvanja = new TipZvanja(dto.getId(), dto.getNaziv(), null, dto.getVidljiv()); 

		if (dto.getZvanja() != null) {
			List<Zvanje> zvanjaEntities = dto.getZvanja().stream()
				.map(zvanjeDTO -> {
					if (zvanjeDTO.getId() == null) {
						
						Zvanje newZvanje = zvanjeService.convertToEntity(zvanjeDTO);
						newZvanje.setTipZvanja(tipZvanja); 
						return zvanjeRepository.save(newZvanje); 
					} else {
						Zvanje zvanje = zvanjeRepository.findById(zvanjeDTO.getId())
							.orElseThrow(() -> new RuntimeException("Zvanje sa ID " + zvanjeDTO.getId() + " ne postoji."));
						zvanje.setTipZvanja(tipZvanja); 
						return zvanje;
					}
				})
				.collect(Collectors.toList());
			tipZvanja.setZvanja(zvanjaEntities);
		}
		return tipZvanja;
	}

	@Override

    @Transactional
    protected void updateEntityFromDto(TipZvanjaDTO dto, TipZvanja entity) {
        if (dto.getNaziv() != null) {
            entity.setNaziv(dto.getNaziv());
        }
        if (dto.getVidljiv() != null) {
            entity.setVidljiv(dto.getVidljiv());
        }

        if (dto.getZvanja() != null) {
            Set<Long> currentZvanjaIds = entity.getZvanja().stream()
                .map(Zvanje::getId)
                .collect(Collectors.toCollection(HashSet::new));

            Set<Long> dtoZvanjaIds = dto.getZvanja().stream()
                .filter(zDTO -> zDTO.getId() != null) 
                .map(ZvanjeDTO::getId)
                .collect(Collectors.toCollection(HashSet::new));

            List<Zvanje> zvanjaToRemove = entity.getZvanja().stream()
                .filter(z -> !dtoZvanjaIds.contains(z.getId()))
                .collect(Collectors.toList());

            for (Zvanje zvanje : zvanjaToRemove) {
                zvanjeRepository.delete(zvanje);
            }
            entity.getZvanja().removeAll(zvanjaToRemove);

            List<Zvanje> updatedZvanjaCollection = new ArrayList<>();

            for (ZvanjeDTO zvanjeDTO : dto.getZvanja()) {
                Zvanje zvanje;

                if (zvanjeDTO.getId() == null) {
                    zvanje = zvanjeService.convertToEntity(zvanjeDTO);
                    zvanje.setTipZvanja(entity); 
                    zvanje = zvanjeRepository.save(zvanje);
                } else {
                    zvanje = zvanjeRepository.findById(zvanjeDTO.getId())
                        .orElseThrow(() -> new RuntimeException("Zvanje sa ID " + zvanjeDTO.getId() + " ne postoji."));

                     zvanjeService.updateEntityFromDto(zvanjeDTO, zvanje);

                    zvanje.setTipZvanja(entity);
                }
                updatedZvanjaCollection.add(zvanje);
            }

            entity.setZvanja(updatedZvanjaCollection);

        } else {
            if (entity.getZvanja() != null && !entity.getZvanja().isEmpty()) {
                zvanjeRepository.deleteAll(entity.getZvanja());
                entity.getZvanja().clear(); 
            }
        }
    }

}
