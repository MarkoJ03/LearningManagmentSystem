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

@Service
public class NaucnaOblastService extends BaseService<NaucnaOblast, NaucnaOblastDTO, Long>{

	@Autowired
	private NaucnaOblastRepository naucnaOblastRepository;
	
	@Autowired
	@Lazy
	private ZvanjeService zvanjeService;
	
	@Override
	protected CrudRepository<NaucnaOblast, Long> getRepository() {
		return naucnaOblastRepository;
	}

	@Override
	protected NaucnaOblastDTO convertToDTO(NaucnaOblast entity) {
		ArrayList<ZvanjeDTO> zvanja = new ArrayList<ZvanjeDTO>();
		for(Zvanje z : entity.getZvanja()) {
			ZvanjeDTO zDTO = zvanjeService.convertToDTO(z);
			zvanja.add(zDTO);
		}
		
		return new NaucnaOblastDTO(entity.getId(), entity.getNaziv(), zvanja, entity.getVidljiv());
	}

	@Override
	protected NaucnaOblast convertToEntity(NaucnaOblastDTO dto) {
		ArrayList<Zvanje> zvanja = new ArrayList<Zvanje>();
		for(ZvanjeDTO zDTO : dto.getZvanja()) {
			Zvanje z = zvanjeService.convertToEntity(zDTO);
			zvanja.add(z);
		}
		
		return new NaucnaOblast(dto.getId(), dto.getNaziv(), zvanja, dto.getVidljiv());
	}

}
