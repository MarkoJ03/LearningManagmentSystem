package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.NaucnaOblastDTO;
import server.DTOs.ZvanjeDTO;
import server.model.NaucnaOblast;
import server.model.Zvanje;
import server.repository.NaucnaOblastRepository;
import server.repository.ZvanjeRepository;

@Service
public class NaucnaOblastService extends BaseService<NaucnaOblast, NaucnaOblastDTO, Long>{

	@Autowired
	private NaucnaOblastRepository naucnaOblastRepository;

	@Autowired
	@Lazy
	private ZvanjeService zvanjeService;
	
	@Autowired
	private ZvanjeRepository zvanjeRepository;


	@Override
	protected CrudRepository<NaucnaOblast, Long> getRepository() {
		return naucnaOblastRepository;
	}

	@Override
	protected NaucnaOblastDTO convertToDTO(NaucnaOblast entity) {

		ArrayList<ZvanjeDTO> zvanja = new ArrayList<>();

		for(Zvanje z : entity.getZvanja()) {
			ZvanjeDTO zDTO = zvanjeService.convertToDTO(z);
			zvanja.add(zDTO);
		}


		return new NaucnaOblastDTO(entity.getId(), entity.getNaziv(), zvanja, entity.getVidljiv());

	}

	@Override
	protected NaucnaOblast convertToEntity(NaucnaOblastDTO dto) {

	    ArrayList<Zvanje> zvanja = new ArrayList<>();

	    if (dto.getZvanja() != null) {
	        for (ZvanjeDTO zDTO : dto.getZvanja()) {
	            Zvanje zvanje = zvanjeRepository.findById(zDTO.getId())
	                .orElseThrow(() -> new RuntimeException("Zvanje sa ID " + zDTO.getId() + " ne postoji."));
	            zvanja.add(zvanje);
	        }
	    }

	    return new NaucnaOblast(
	        dto.getId(),
	        dto.getNaziv(),
	        zvanja,
	        dto.getVidljiv()
	    );
	}

	@Override
	protected void updateEntityFromDto(NaucnaOblastDTO dto, NaucnaOblast entity) {
		// TODO Auto-generated method stub
		
	}

}
