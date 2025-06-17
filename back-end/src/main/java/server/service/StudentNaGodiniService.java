package server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.GodinaStudijaDTO;
import server.DTOs.IshodEvaluacijeDTO;
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
		List<IshodEvaluacije> kopija = new ArrayList<>(entity.getIshodEvaluacije());
		for (IshodEvaluacije z : kopija) {
		    IshodEvaluacijeDTO zDTO = ishodService.convertToDTO(z);
		    ishodi.add(zDTO);
		}

		
		GodinaStudijaDTO godinaStudija = godinaStudijaService.convertToDTO(entity.getGodinaStudija());
		return new StudentNaGodiniDTO(entity.getId(),entity.getBrojIndeksa(),entity.getDatumUpisa(),studentService.convertToDTO(entity.getStudent()),godinaStudija,grupaService.convertToDTO(entity.getGrupaStudenata()),ishodi,sv, entity.getVidljiv());
	}

	@Override
	protected StudentNaGodini convertToEntity(StudentNaGodiniDTO dto) {
	    Student student = new Student();
	    student.setId(dto.getStudent().getId());

	    GodinaStudija godinaStudija = new GodinaStudija();
	    godinaStudija.setId(dto.getGodinaStudija().getId());

	    GrupaStudenata grupa = new GrupaStudenata();
	    grupa.setId(dto.getGrupaStudenata().getId());

	    SvObrazac svObrazac = new SvObrazac();
	    svObrazac.setId(dto.getSvObrazac().getId());

	    ArrayList<IshodEvaluacije> ishodi = new ArrayList<>();
	    if (dto.getIshodEvaluacije() != null) {
	        for (IshodEvaluacijeDTO z : dto.getIshodEvaluacije()) {
	            IshodEvaluacije entitet = new IshodEvaluacije();
	            entitet.setId(z.getId());
	            ishodi.add(entitet);
	        }
	    }

	    return new StudentNaGodini(
	        dto.getId(),
	        dto.getBrojIndeksa(),
	        dto.getDatumUpisa(),
	        student,
	        godinaStudija,
	        grupa,
	        ishodi,
	        svObrazac,
	        dto.getVidljiv()
	    );
	}




}