package server.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.GodinaStudijaDTO;
import server.DTOs.GrupaStudenataDTO;
import server.DTOs.IshodEvaluacijeDTO;
import server.DTOs.StudentDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.DTOs.SvObrazacDTO;
import server.model.GodinaStudija;
import server.model.GrupaStudenata;
import server.model.IshodEvaluacije;
import server.model.Student;
import server.model.StudentNaGodini;
import server.model.SvObrazac;
import server.repository.StudentNaGodiniRepository;

@Service
public class StudentNaGodiniService  extends BaseService<StudentNaGodini, StudentNaGodiniDTO, Long>{

	@Autowired
	private StudentNaGodiniRepository studentNaGodiniRepository;

	@Autowired
	@Lazy
	private StudentService studentService;

	@Autowired
	@Lazy
	private GodinaStudijaService godinaStudijaService;

	@Autowired
	@Lazy
	private GrupaStudenataService grupaStudenataService;

	@Autowired
	@Lazy
	private IshodEvaluacijeService ishodEvaluacijeService;

	@Autowired
	@Lazy
	private SvObrazacService svObrazacService;

	protected CrudRepository<StudentNaGodini, Long> getRepository() {
		return studentNaGodiniRepository;
	}

	public StudentNaGodiniDTO convertToDTO(StudentNaGodini entity) {
		if (entity == null)
			return null;

		StudentDTO studentDTO = studentService.convertToDTO(entity.getStudent());
		GodinaStudijaDTO godinaStudijaDTO = godinaStudijaService.convertToDTO(entity.getGodinaStudija());
		GrupaStudenataDTO grupaStudenataDTO = grupaStudenataService.convertToDTO(entity.getGrupaStudenata());

		List<IshodEvaluacijeDTO> ishodEvaluacijeDTOs = new ArrayList<>();
		if (entity.getIshodEvaluacije() != null) {
			for (IshodEvaluacije ie : entity.getIshodEvaluacije()) {
				ishodEvaluacijeDTOs.add(ishodEvaluacijeService.convertToDTO(ie));
			}
		}

		SvObrazacDTO svObrazacDTO = null;
		if (entity.getSvObrazac() != null) {
			svObrazacDTO = svObrazacService.convertToDTO(entity.getSvObrazac());
		}

		return new StudentNaGodiniDTO(entity.getId(), entity.getBrojIndeksa(), entity.getDatumUpisa(), studentDTO,
				godinaStudijaDTO, grupaStudenataDTO, ishodEvaluacijeDTOs, svObrazacDTO, entity.getVidljiv());
	}

	public StudentNaGodini convertToEntity(StudentNaGodiniDTO dto) {
		if (dto == null)
			return null;

		Student student = studentService.convertToEntity(dto.getStudent());
		GodinaStudija godinaStudija = godinaStudijaService.convertToEntity(dto.getGodinaStudija());
		GrupaStudenata grupaStudenata = grupaStudenataService.convertToEntity(dto.getGrupaStudenata());

		List<IshodEvaluacije> ishodEvaluacijeList = new ArrayList<>();
		if (dto.getIshodEvaluacije() != null) {
			for (IshodEvaluacijeDTO ieDTO : dto.getIshodEvaluacije()) {
				ishodEvaluacijeList.add(ishodEvaluacijeService.convertToEntity(ieDTO));
			}
		}

		SvObrazac svObrazac = null;
		if (dto.getSvObrazac() != null) {
			svObrazac = svObrazacService.convertToEntity(dto.getSvObrazac());
		}

		StudentNaGodini entity = new StudentNaGodini();
		entity.setId(dto.getId());
		entity.setBrojIndeksa(dto.getBrojIndeksa());
		entity.setDatumUpisa(dto.getDatumUpisa());
		entity.setStudent(student);
		entity.setGodinaStudija(godinaStudija);
		entity.setGrupaStudenata(grupaStudenata);
		entity.setIshodEvaluacije(ishodEvaluacijeList);
		entity.setSvObrazac(svObrazac);
		entity.setVidljiv(dto.getVidljiv());

		return entity;
	}

	@Override
	protected void updateEntityFromDto(StudentNaGodiniDTO dto, StudentNaGodini entity) {
		// TODO Auto-generated method stub
		
	}

}
