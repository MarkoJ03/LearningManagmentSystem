package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.IshodEvaluacijeDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.model.EvaluacijaZnanja;
import server.model.IshodEvaluacije;
import server.model.StudentNaGodini;
import server.repository.EvaluacijaZnanjaRepository;
import server.repository.IshodEvaluacijeRepository;

@Service
public class IshodEvaluacijeService extends BaseService<IshodEvaluacije, IshodEvaluacijeDTO, Long>{

	@Autowired
	private IshodEvaluacijeRepository ishodEvaluacijeRepository;

	@Autowired
	@Lazy
	private EvaluacijaZnanjaService eService;
	
	@Autowired
	@Lazy
	private IshodPredmetaService iService;
	
	@Autowired
	@Lazy
	private StudentNaGodiniService sService;
	
	@Override
	protected CrudRepository<IshodEvaluacije, Long> getRepository() {
		return ishodEvaluacijeRepository;
	}

	@Override
	protected IshodEvaluacijeDTO convertToDTO(IshodEvaluacije entity) {
//		RealizacijaPredmetaDTO realizacijaPredmeta = new RealizacijaPredmetaDTO(entity.getRealizacijaPredmeta().getId(),
//				null, null, null, null, null, entity.getRealizacijaPredmeta().getVidljiv());
		


		return new IshodEvaluacijeDTO(entity.getId(), entity.getNapomena(), entity.getBodovi(),null, eService.convertToDTO(entity.getEvaluacijaZnanja()),iService.convertToDTO(entity.getIshodPredmeta()), entity.getVidljiv());
	}

	@Override
	protected IshodEvaluacije convertToEntity(IshodEvaluacijeDTO dto) {
//		RealizacijaPredmeta realizacijaPredmeta = new RealizacijaPredmeta(dto.getRealizacijaPredmeta().getId(),
//				null, null, null, null, null, dto.getRealizacijaPredmeta().getVidljiv());


		return new IshodEvaluacije(dto.getId(), dto.getNapomena(), dto.getBodovi(),null,eService.convertToEntity(dto.getEvaluacijaZnanja()),iService.convertToEntity(dto.getIshodPredmeta()),dto.getVidljiv());
	}

}