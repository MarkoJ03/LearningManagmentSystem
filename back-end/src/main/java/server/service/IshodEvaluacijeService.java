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
		 StudentNaGodiniDTO studentDTO = null;
		    if (entity.getStudentNaGodini() != null) {
		        studentDTO = new StudentNaGodiniDTO();
		        studentDTO.setId(entity.getStudentNaGodini().getId());
		        studentDTO.setBrojIndeksa(entity.getStudentNaGodini().getBrojIndeksa());
		    }

	    return new IshodEvaluacijeDTO(
	        entity.getId(),
	        entity.getNapomena(),
	        entity.getBodovi(),
	        studentDTO,
	        eService.convertToDTO(entity.getEvaluacijaZnanja()),
	        iService.convertToDTO(entity.getIshodPredmeta()),
	        entity.getVidljiv()
	    );
	}

	
	@Override
	protected IshodEvaluacije convertToEntity(IshodEvaluacijeDTO dto) {
	    StudentNaGodini student = null;
	    if (dto.getStudentNaGodini() != null) {
	        student = new StudentNaGodini();
	        student.setId(dto.getStudentNaGodini().getId());
	    }

	    return new IshodEvaluacije(
	        dto.getId(),
	        dto.getNapomena(),
	        dto.getBodovi(),
	        student,
	        eService.convertToEntity(dto.getEvaluacijaZnanja()),
	        iService.convertToEntity(dto.getIshodPredmeta()),
	        dto.getVidljiv()
	    );
	}

	@Override
	protected void updateEntityFromDto(IshodEvaluacijeDTO dto, IshodEvaluacije entity) {
	    entity.setNapomena(dto.getNapomena());
	    entity.setBodovi(dto.getBodovi());
	    entity.setVidljiv(dto.getVidljiv());

	    if (dto.getStudentNaGodini() != null && dto.getStudentNaGodini().getId() != null) {
	        var existingStudent = sService.getRepository().findById(dto.getStudentNaGodini().getId())
	            .orElseThrow(() -> new RuntimeException("StudentNaGodini not found with id " + dto.getStudentNaGodini().getId()));
	        entity.setStudentNaGodini(existingStudent);
	    } else {
	        entity.setStudentNaGodini(null);
	    }

	    if (dto.getEvaluacijaZnanja() != null && dto.getEvaluacijaZnanja().getId() != null) {
	        var existingEvaluacija = eService.getRepository().findById(dto.getEvaluacijaZnanja().getId())
	            .orElseThrow(() -> new RuntimeException("EvaluacijaZnanja not found with id " + dto.getEvaluacijaZnanja().getId()));
	        entity.setEvaluacijaZnanja(existingEvaluacija);
	    } else {
	        entity.setEvaluacijaZnanja(null);
	    }

	    if (dto.getIshodPredmeta() != null && dto.getIshodPredmeta().getId() != null) {
	        var existingIshod = iService.getRepository().findById(dto.getIshodPredmeta().getId())
	            .orElseThrow(() -> new RuntimeException("IshodPredmeta not found with id " + dto.getIshodPredmeta().getId()));
	        entity.setIshodPredmeta(existingIshod);
	    } else {
	        entity.setIshodPredmeta(null);
	    }
	}
}