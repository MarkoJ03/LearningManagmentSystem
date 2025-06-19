package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.GrupaStudenataDTO;
import server.DTOs.KalendarDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.DTOs.GrupaStudenataPredmetDTO;
import server.DTOs.StudentDTO;
import server.DTOs.PredmetDTO;

import server.model.GrupaStudenata;
import server.model.Kalendar;
import server.model.StudentNaGodini;
import server.model.GrupaStudenataPredmet;
import server.model.Student;
import server.model.Predmet;

import server.repository.GrupaStudenataRepository;
import server.repository.KalendarRepository;
import server.repository.StudentNaGodiniRepository;
import server.repository.StudentRepository;
import server.repository.PredmetRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GrupaStudenataService extends BaseService<GrupaStudenata, GrupaStudenataDTO, Long> {

    @Autowired
    private GrupaStudenataRepository grupaStudenataRepository;

    @Autowired
    private KalendarRepository kalendarRepository;

    @Autowired
    private StudentNaGodiniRepository studentNaGodiniRepository;
    
    

    @Autowired
    private StudentRepository studentRepository; 

    @Autowired
    private PredmetRepository predmetRepository; 


    @Autowired
    @Lazy 
    private KalendarService kalendarService;

    @Autowired
    @Lazy
    private StudentNaGodiniService studentNaGodiniService;

    


    @Override
    protected CrudRepository<GrupaStudenata, Long> getRepository() {
        return grupaStudenataRepository;
    }

    @Override
    protected GrupaStudenataDTO convertToDTO(GrupaStudenata entity) {
        List<StudentNaGodiniDTO> studentiNaGodiniDTOs = new ArrayList<>();
        List<GrupaStudenataPredmetDTO> grupaStudenataPredmetDTOs = new ArrayList<>();
        KalendarDTO kalendarDTO = null;

        
        if (entity.getStudentNaGodini() != null) {
            for (StudentNaGodini studentNaGodiniEntity : entity.getStudentNaGodini()) {
                StudentNaGodiniDTO dto = new StudentNaGodiniDTO();
                dto.setId(studentNaGodiniEntity.getId());
                dto.setBrojIndeksa(studentNaGodiniEntity.getBrojIndeksa());
                dto.setVidljiv(studentNaGodiniEntity.getVidljiv());

                
                if (studentNaGodiniEntity.getStudent() != null) {
                    StudentDTO studentDto = new StudentDTO();
                    studentDto.setId(studentNaGodiniEntity.getStudent().getId());
                    studentDto.setIme(studentNaGodiniEntity.getStudent().getIme());
                    studentDto.setPrezime(studentNaGodiniEntity.getStudent().getPrezime());
                    studentDto.setJmbg(studentNaGodiniEntity.getStudent().getJmbg());
                    
                    studentDto.setVidljiv(studentNaGodiniEntity.getStudent().getVidljiv());
                    dto.setStudent(studentDto);
                } else {
                    dto.setStudent(null);
                }
                studentiNaGodiniDTOs.add(dto);
            }
        }

       

        
        if (entity.getKalendar() != null) {
            kalendarDTO = new KalendarDTO();
            kalendarDTO.setId(entity.getKalendar().getId());
            kalendarDTO.setVidljiv(entity.getKalendar().getVidljiv());
            
        }
        
        
        List<GrupaStudenataPredmetDTO> realizacijePredmeta = entity.getPredmeti() != null ?
	            entity.getPredmeti().stream()
	                .map(rp -> {
	                    PredmetDTO realizacijaDTO = null;
	                    if (rp.getPredmet() != null) {
	                        realizacijaDTO = new PredmetDTO(rp.getPredmet().getId(),rp.getPredmet().getNaziv(),null,null,null,null,null,null,null,null,null,null,null,null,null,rp.getPredmet().getVidljiv());
	                    }
	                    return new GrupaStudenataPredmetDTO(rp.getId(), null, realizacijaDTO, rp.getVidljiv());
	                })
	                .collect(Collectors.toList()) :
	            new ArrayList<>();

        return new GrupaStudenataDTO(
            entity.getId(),
            studentiNaGodiniDTOs,
            realizacijePredmeta,
            kalendarDTO,
            entity.getVidljiv()
        );
    }

    @Override
    protected GrupaStudenata convertToEntity(GrupaStudenataDTO dto) {
    	System.out.println(dto);
        GrupaStudenata entity = new GrupaStudenata();
        entity.setId(dto.getId()); 
        entity.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true);

       
        if (dto.getKalendar() != null && dto.getKalendar().getId() != null) {
            kalendarRepository.findById(dto.getKalendar().getId())
                              .ifPresent(entity::setKalendar);
        } else {
            entity.setKalendar(null);
        }

        

        

List<GrupaStudenataPredmet> grupeLinks = new ArrayList<>();
		if (dto.getPredmeti() != null) {
			for (GrupaStudenataPredmetDTO gspDTO : dto.getPredmeti()) {
				if (gspDTO.getPredmet() != null && gspDTO.getPredmet().getId() != null) {
					Optional<Predmet> optGrupa= predmetRepository.findById(gspDTO.getPredmet().getId());
					if (optGrupa.isPresent()) {
						GrupaStudenataPredmet gsp = new GrupaStudenataPredmet();
						gsp.setGrupaStudenata(entity); 
						gsp.setPredmet(optGrupa.get());
						gsp.setVidljiv(gspDTO.getVidljiv() != null ? gspDTO.getVidljiv() : true);
						grupeLinks.add(gsp);
					}
				}
			}
		}
		entity.setPredmeti(grupeLinks);
        
        
        ArrayList<StudentNaGodini> studentNaGodini = new ArrayList<>();

		if (dto.getStudentiNaGodini() != null) {
			for (StudentNaGodiniDTO eDto : dto.getStudentiNaGodini()) {
				if (eDto.getId() != null) {

					StudentNaGodini existingStudent = studentNaGodiniService.getRepository().findById(eDto.getId())
							.orElseThrow(() -> new RuntimeException("Evaluacija znanja not found with id " + eDto.getId()));

					existingStudent.setGrupaStudenata(entity);

					studentNaGodini.add(existingStudent);
				}
			}
		}

		entity.setStudentNaGodini(studentNaGodini);

       
      

        return entity;
    }

    @Override
	protected void updateEntityFromDto(GrupaStudenataDTO dto, GrupaStudenata entity) {
		
		entity.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : entity.getVidljiv());

		
		if (dto.getKalendar() != null && dto.getKalendar().getId() != null) {
			kalendarRepository.findById(dto.getKalendar().getId())
					.ifPresent(entity::setKalendar);
		} else {
			entity.setKalendar(null);
		}

		
		List<StudentNaGodini> updatedStudentiNaGodini = new ArrayList<>();
		if (dto.getStudentiNaGodini() != null) {
			for (StudentNaGodiniDTO studentNaGodiniDTO : dto.getStudentiNaGodini()) {
				if (studentNaGodiniDTO.getId() != null) {
					
					studentNaGodiniService.getRepository().findById(studentNaGodiniDTO.getId())
							.ifPresent(student -> {
								student.setGrupaStudenata(entity);
								updatedStudentiNaGodini.add(student);
							});
				}
			}
		}
		
		entity.getStudentNaGodini().clear();
		entity.getStudentNaGodini().addAll(updatedStudentiNaGodini);


		
		List<GrupaStudenataPredmet> updatedGrupeLinks = new ArrayList<>();
		if (dto.getPredmeti() != null) {
			for (GrupaStudenataPredmetDTO gspDTO : dto.getPredmeti()) {
				if (gspDTO.getPredmet() != null && gspDTO.getPredmet().getId() != null) {
					Optional<Predmet> optPredmet = predmetRepository.findById(gspDTO.getPredmet().getId());
					if (optPredmet.isPresent()) {
						GrupaStudenataPredmet gsp = new GrupaStudenataPredmet();
						gsp.setGrupaStudenata(entity); 
						gsp.setPredmet(optPredmet.get());
						gsp.setVidljiv(gspDTO.getVidljiv() != null ? gspDTO.getVidljiv() : true);
						
						updatedGrupeLinks.add(gsp);
					}
				}
			}
		}
		entity.getPredmeti().clear();
		entity.getPredmeti().addAll(updatedGrupeLinks);
	}

    
}


