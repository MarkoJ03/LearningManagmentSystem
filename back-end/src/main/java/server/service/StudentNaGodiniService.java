package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.GodinaStudijaDTO;
import server.DTOs.IshodEvaluacijeDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.DTOs.SvObrazacDTO;
import server.DTOs.ZvanjeDTO;
import server.model.GodinaStudija;
import server.model.IshodEvaluacije;
import server.model.StudentNaGodini;
import server.model.SvObrazac;
import server.model.Zvanje;
import server.repository.StudentNaGodiniRepository;


@Service
public class StudentNaGodiniService extends BaseService<StudentNaGodini, StudentNaGodiniDTO, Long>{


	@Autowired
	private StudentNaGodiniRepository studentNaGodiniRepository;
	
	@Autowired
	@Lazy
	private StudentService studentService;
	
	@Autowired
	@Lazy
	private SvObrazacService obrazacService;
	
	@Autowired
	@Lazy
	private GodinaStudijaService godinaStudijaService;
	
	@Autowired
	@Lazy
	private GrupaStudenataService grupaService;
	
	@Autowired
	@Lazy
	private IshodEvaluacijeService ishodService;
	
  @Override
 protected CrudRepository<StudentNaGodini, Long> getRepository() {
      return studentNaGodiniRepository;
  }

	@Override
	protected StudentNaGodiniDTO convertToDTO(StudentNaGodini entity) {
		
		SvObrazacDTO sv = obrazacService.convertToDTO(entity.getSvObrazac());
		
		
		ArrayList<IshodEvaluacijeDTO> ishodi = new ArrayList<>();
		for (IshodEvaluacije z : entity.getIshodEvaluacije()) {
			IshodEvaluacijeDTO zDTO = ishodService.convertToDTO(z);
			ishodi.add(zDTO);
		}
		
		GodinaStudijaDTO godinaStudija = godinaStudijaService.convertToDTO(entity.getGodinaStudija());
		return new StudentNaGodiniDTO(entity.getId(),entity.getBrojIndeksa(),entity.getDatumUpisa(),studentService.convertToDTO(entity.getStudent()),godinaStudija,grupaService.convertToDTO(entity.getGrupaStudenata()),ishodi,sv, entity.getVidljiv());
	}

	@Override
	protected StudentNaGodini convertToEntity(StudentNaGodiniDTO dto) {
		
		ArrayList<IshodEvaluacije> ishodi = new ArrayList<>();
		for (IshodEvaluacijeDTO z : dto.getIshodEvaluacije()) {
			IshodEvaluacije zDTO = ishodService.convertToEntity(z);
			ishodi.add(zDTO);
		}
		
		SvObrazac sv = obrazacService.convertToEntity(dto.getSvObrazac());
		
		GodinaStudija godinaStudija = godinaStudijaService.convertToEntity(dto.getGodinaStudija());
		return new StudentNaGodini(dto.getId(),dto.getBrojIndeksa(),dto.getDatumUpisa(),studentService.convertToEntity(dto.getStudent()), godinaStudija,grupaService.convertToEntity(dto.getGrupaStudenata()),ishodi,sv,dto.getVidljiv());
		}



}