package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.TipZvanjaDTO;
import server.DTOs.ZvanjeDTO;
import server.model.TipZvanja;
import server.model.Zvanje;
import server.repository.TipZvanjaRepository;

@Service
public class TipZvanjaService extends BaseService<TipZvanja, TipZvanjaDTO, Long>{

	@Autowired
	private TipZvanjaRepository tipZvanjaRepository;
	
	@Autowired
	@Lazy
	private ZvanjeService zvanjeService;
	
	@Override
	protected CrudRepository<TipZvanja, Long> getRepository() {
		return tipZvanjaRepository;
	}

	@Override
	protected TipZvanjaDTO convertToDTO(TipZvanja entity) {
		ArrayList<ZvanjeDTO> zvanja = new ArrayList<ZvanjeDTO>();
		for(Zvanje z : entity.getZvanja()) {
			ZvanjeDTO zDTO = zvanjeService.convertToDTO(z);
			zvanja.add(zDTO);
		}
		
		return new TipZvanjaDTO(entity.getId(), entity.getNaziv(), zvanja);
	}

	@Override
	protected TipZvanja convertToEntity(TipZvanjaDTO dto) {
		ArrayList<Zvanje> zvanja = new ArrayList<Zvanje>();
		for(ZvanjeDTO zDTO : dto.getZvanja()) {
			Zvanje z = zvanjeService.convertToEntity(zDTO);
			zvanja.add(z);
		}
		
		return new TipZvanja(dto.getId(), dto.getNaziv(), zvanja);
	}

}
