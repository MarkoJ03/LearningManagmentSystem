package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.GrupaStudenataDTO;
import server.DTOs.GrupaStudenataPredmetDTO;
import server.DTOs.PredmetDTO;
import server.model.GrupaStudenata;
import server.model.GrupaStudenataPredmet;
import server.model.Predmet;
import server.repository.GrupaStudenataPredmetRepository;

@Service
public class GrupaStudenataPredmetService extends BaseService<GrupaStudenataPredmet, GrupaStudenataPredmetDTO, Long> {
	
	@Autowired
	private GrupaStudenataPredmetRepository grupaStudenataPredmetRepository;
	
	
	@Override
	protected CrudRepository<GrupaStudenataPredmet, Long> getRepository() {
		return grupaStudenataPredmetRepository;
	}

	@Override
	protected GrupaStudenataPredmetDTO convertToDTO(GrupaStudenataPredmet entity) {
		return new GrupaStudenataPredmetDTO(
				entity.getId(),
				new GrupaStudenataDTO(entity.getGrupaStudenata().getId(), null, null, null, entity.getGrupaStudenata().getVidljiv()),
				new PredmetDTO(entity.getPredmet().getId(), entity.getPredmet().getNaziv(), null, null, null, null,null,null,null,null, null, null, null, null, null, entity.getPredmet().getVidljiv()),
				entity.getVidljiv()
				);
	}

	@Override
	protected GrupaStudenataPredmet convertToEntity(GrupaStudenataPredmetDTO dto) {
		return new GrupaStudenataPredmet(
				dto.getId(),
				new GrupaStudenata(dto.getGrupaStudenata().getId(), null, null, null, dto.getGrupaStudenata().getVidljiv()),
				new Predmet(dto.getPredmet().getId(), dto.getPredmet().getNaziv(), null, null, null, null,null,null,null,null, null, null, null, null, null, dto.getPredmet().getVidljiv()),
				dto.getVidljiv()
				);
	}

	@Override
	protected void updateEntityFromDto(GrupaStudenataPredmetDTO dto, GrupaStudenataPredmet entity) {
		// TODO Auto-generated method stub
		
	}

}
