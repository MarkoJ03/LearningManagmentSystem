package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.PredmetDTO;
import server.DTOs.PredmetRealizacijePredmetaDTO;
import server.DTOs.RealizacijaPredmetaDTO;
import server.model.Predmet;
import server.model.PredmetRealizacijePredmeta;
import server.model.RealizacijaPredmeta;
import server.repository.PredmetRealizacijePredmetaRepository;

@Service
public class PredmetRealizacijePredmetaService extends BaseService<PredmetRealizacijePredmeta, PredmetRealizacijePredmetaDTO, Long>{

	@Autowired
	private PredmetRealizacijePredmetaRepository prpRepository;
	
	@Override
	protected CrudRepository<PredmetRealizacijePredmeta, Long> getRepository() {
		return prpRepository;
	}

	@Override
	protected PredmetRealizacijePredmetaDTO convertToDTO(PredmetRealizacijePredmeta entity) {
		return new PredmetRealizacijePredmetaDTO(
				entity.getId(),
				new PredmetDTO(entity.getPredmet().getId(), entity.getPredmet().getNaziv(), null,null,null,null,null,null,null,null,null,null,null,null,null, entity.getPredmet().getVidljiv()),
				new RealizacijaPredmetaDTO(entity.getRealizacijaPredmeta().getId(), null, null, null, null, null, entity.getRealizacijaPredmeta().getVidljiv()),
				entity.getVidljiv()
				);
	}

	@Override
	protected PredmetRealizacijePredmeta convertToEntity(PredmetRealizacijePredmetaDTO dto) {
		return new PredmetRealizacijePredmeta(
				dto.getId(),
				new Predmet(dto.getPredmet().getId(), dto.getPredmet().getNaziv(), null,null,null,null,null,null,null,null,null,null,null,null,null, dto.getPredmet().getVidljiv()),
				new RealizacijaPredmeta(dto.getRealizacijaPredmeta().getId(), null, null, null, null, null, dto.getRealizacijaPredmeta().getVidljiv()),
				dto.getVidljiv()
				);
	}

	@Override
	protected void updateEntityFromDto(PredmetRealizacijePredmetaDTO dto, PredmetRealizacijePredmeta entity) {
		// TODO Auto-generated method stub
		
	}

}
