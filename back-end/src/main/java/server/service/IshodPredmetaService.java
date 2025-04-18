package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.IshodPredmetaDTO;
import server.DTOs.RealizacijaPredmetaDTO;
import server.model.IshodPredmeta;
import server.model.RealizacijaPredmeta;
import server.repository.IshodPredmetaRepository;

@Service
public class IshodPredmetaService extends BaseService<IshodPredmeta, IshodPredmetaDTO, Long>{

	@Autowired
	private IshodPredmetaRepository ishodPredmetaRepository;

	@Override
	protected CrudRepository<IshodPredmeta, Long> getRepository() {
		return ishodPredmetaRepository;
	}

	@Override
	protected IshodPredmetaDTO convertToDTO(IshodPredmeta entity) {
		RealizacijaPredmetaDTO realizacijaPredmeta = new RealizacijaPredmetaDTO(entity.getRealizacijaPredmeta().getId(),
				null, null, null, null, null, entity.getRealizacijaPredmeta().getVidljiv());

		return new IshodPredmetaDTO(entity.getId(), entity.getOcena(), realizacijaPredmeta, entity.getVidljiv());
	}

	@Override
	protected IshodPredmeta convertToEntity(IshodPredmetaDTO dto) {
		RealizacijaPredmeta realizacijaPredmeta = new RealizacijaPredmeta(dto.getRealizacijaPredmeta().getId(),
				null, null, null, null, null, dto.getRealizacijaPredmeta().getVidljiv());

		return new IshodPredmeta(dto.getId(), dto.getOcena(), realizacijaPredmeta,dto.getVidljiv());
	}

}
