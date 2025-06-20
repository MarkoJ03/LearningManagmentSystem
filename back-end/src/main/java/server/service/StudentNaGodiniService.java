package server.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors; 

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
import server.repository.StudentRepository;
import server.repository.GodinaStudijaRepository;
import server.repository.GrupaStudenataPredmetRepository;
import server.repository.GrupaStudenataRepository;
import server.repository.SvObrazacRepository;
import server.repository.IshodEvaluacijeRepository;

@Service
public class StudentNaGodiniService extends BaseService<StudentNaGodini, StudentNaGodiniDTO, Long> {

    @Autowired
    private StudentNaGodiniRepository studentNaGodiniRepository;
    @Autowired
    private GrupaStudenataPredmetRepository gspRepo;
    
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private GodinaStudijaRepository godinaStudijaRepository;
    @Autowired
    private GrupaStudenataRepository grupaStudenataRepository;
    @Autowired
    private SvObrazacRepository svObrazacRepository;
    @Autowired
    private IshodEvaluacijeRepository ishodEvaluacijeRepository;

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
        
        SvObrazacDTO svObrazacDTO = null;
        if (entity.getSvObrazac() != null) {
            svObrazacDTO = obrazacService.convertToDTO(entity.getSvObrazac());
        }

        
        List<IshodEvaluacijeDTO> ishodiDTO = new ArrayList<>();
        if (entity.getIshodEvaluacije() != null) {
            for (IshodEvaluacije ie : entity.getIshodEvaluacije()) {
                ishodiDTO.add(ishodService.convertToDTO(ie)); 
            }
        }

        GodinaStudijaDTO godinaStudijaDTO = null;
        if (entity.getGodinaStudija() != null) {
            
    		godinaStudijaDTO = godinaStudijaService.convertToDTO(entity.getGodinaStudija());
        }


        StudentDTO studenti = null;
		if (entity.getStudent() != null) {
			studenti= studentService.convertToDTO(entity.getStudent());
		}	
       
        GrupaStudenataDTO grupaStudenataDTO = null;
        if (entity.getGrupaStudenata() != null) {
            grupaStudenataDTO = grupaService.convertToDTO(entity.getGrupaStudenata());
        }

        return new StudentNaGodiniDTO(
                entity.getId(),
                entity.getBrojIndeksa(),
                entity.getDatumUpisa(),
                studenti,
                godinaStudijaDTO,
                grupaStudenataDTO,
                ishodiDTO,
                svObrazacDTO,
                entity.getVidljiv()
        );
    }

    
    @Override
    protected StudentNaGodini convertToEntity(StudentNaGodiniDTO dto) {
        StudentNaGodini studentNaGodini = new StudentNaGodini();
        studentNaGodini.setId(dto.getId()); 
        studentNaGodini.setBrojIndeksa(dto.getBrojIndeksa());
        studentNaGodini.setDatumUpisa(dto.getDatumUpisa());
        
        studentNaGodini.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true);

       
        if (dto.getStudent() != null && dto.getStudent().getId() != null) {
            
            Student existingStudent = studentRepository.findById(dto.getStudent().getId())
                    .orElseThrow(() -> new RuntimeException("Student with ID " + dto.getStudent().getId() + " not found."));
            studentNaGodini.setStudent(existingStudent);
        } else {
          
            throw new IllegalArgumentException("Student must be defined and have an ID when creating StudentNaGodini.");
        }

        
        if (dto.getGodinaStudija() != null && dto.getGodinaStudija().getId() != null) {
            GodinaStudija existingGodinaStudija = godinaStudijaRepository.findById(dto.getGodinaStudija().getId())
                    .orElseThrow(() -> new RuntimeException("Godina studija with ID " + dto.getGodinaStudija().getId() + " not found."));
            studentNaGodini.setGodinaStudija(existingGodinaStudija);
        } else {
            
            throw new IllegalArgumentException("Godina studija must be defined and have an ID when creating StudentNaGodini.");
        }

        
        if (dto.getGrupaStudenata() != null && dto.getGrupaStudenata().getId() != null) {
            GrupaStudenata existingGrupaStudenata = grupaStudenataRepository.findById(dto.getGrupaStudenata().getId())
                    .orElseThrow(() -> new RuntimeException("Grupa studenata with ID " + dto.getGrupaStudenata().getId() + " not found."));
            studentNaGodini.setGrupaStudenata(existingGrupaStudenata);
        } else {
            studentNaGodini.setGrupaStudenata(null); 
        }

        
        if (dto.getSvObrazac() != null) {
            SvObrazac svObrazac = null;
            if (dto.getSvObrazac().getId() != null) {
                
                svObrazac = svObrazacRepository.findById(dto.getSvObrazac().getId())
                        .orElseThrow(() -> new RuntimeException("SvObrazac with ID " + dto.getSvObrazac().getId() + " not found."));
                obrazacService.updateEntityFromDto(dto.getSvObrazac(), svObrazac); 
            } else {
                svObrazac = obrazacService.convertToEntity(dto.getSvObrazac());
            }
            svObrazac.setStudentNaGodini(studentNaGodini); 
            studentNaGodini.setSvObrazac(svObrazac);
        } else {
            studentNaGodini.setSvObrazac(null); 
        }

        
        List<IshodEvaluacije> ishodi = new ArrayList<>();
        if (dto.getIshodEvaluacije() != null) {
            for (IshodEvaluacijeDTO ieDTO : dto.getIshodEvaluacije()) {
                IshodEvaluacije ishod = null;
                if (ieDTO.getId() != null) {
                    
                    ishod = ishodEvaluacijeRepository.findById(ieDTO.getId())
                            .orElseThrow(() -> new RuntimeException("IshodEvaluacije with ID " + ieDTO.getId() + " not found."));
                    ishodService.updateEntityFromDto(ieDTO, ishod); 
                } else {
                    ishod = ishodService.convertToEntity(ieDTO);
                }
                ishod.setStudentNaGodini(studentNaGodini); 
                ishodi.add(ishod);
            }
        }
        studentNaGodini.setIshodEvaluacije(ishodi); 

        return studentNaGodini;
    }

    
    @Override
    protected void updateEntityFromDto(StudentNaGodiniDTO dto, StudentNaGodini entity) {
        
        entity.setBrojIndeksa(dto.getBrojIndeksa());
        entity.setDatumUpisa(dto.getDatumUpisa());
        entity.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true);

       
        if (dto.getStudent() != null && dto.getStudent().getId() != null) {
            Student existingStudent = studentRepository.findById(dto.getStudent().getId())
                    .orElseThrow(() -> new RuntimeException("Student with ID " + dto.getStudent().getId() + " not found for update."));
            entity.setStudent(existingStudent);
           
        } else {
            throw new IllegalArgumentException("Student must be defined and have an ID during update.");
        }

        
        if (dto.getGodinaStudija() != null && dto.getGodinaStudija().getId() != null) {
            GodinaStudija existingGodinaStudija = godinaStudijaRepository.findById(dto.getGodinaStudija().getId())
                    .orElseThrow(() -> new RuntimeException("Godina studija with ID " + dto.getGodinaStudija().getId() + " not found for update."));
            entity.setGodinaStudija(existingGodinaStudija);
            
        } else {
            throw new IllegalArgumentException("Godina studija must be defined and have an ID during update.");
        }

        
        if (dto.getGrupaStudenata() != null && dto.getGrupaStudenata().getId() != null) {
            GrupaStudenata existingGrupaStudenata = grupaStudenataRepository.findById(dto.getGrupaStudenata().getId())
                    .orElseThrow(() -> new RuntimeException("Grupa studenata with ID " + dto.getGrupaStudenata().getId() + " not found for update."));
            entity.setGrupaStudenata(existingGrupaStudenata);
            
        } else {
            entity.setGrupaStudenata(null); 
        }

        
        if (dto.getSvObrazac() != null) {
            SvObrazac svObrazac;
            if (dto.getSvObrazac().getId() != null) {
               
                svObrazac = svObrazacRepository.findById(dto.getSvObrazac().getId())
                        .orElseThrow(() -> new RuntimeException("SvObrazac with ID " + dto.getSvObrazac().getId() + " not found for update."));
                obrazacService.updateEntityFromDto(dto.getSvObrazac(), svObrazac);
            } else {
                svObrazac = obrazacService.convertToEntity(dto.getSvObrazac());
            }
            svObrazac.setStudentNaGodini(entity);
            entity.setSvObrazac(svObrazac);
        } else {
           
            if (entity.getSvObrazac() != null) {
                entity.setSvObrazac(null);
            }
        }

        
        List<IshodEvaluacije> updatedIshodi = new ArrayList<>();
        if (dto.getIshodEvaluacije() != null) {
            for (IshodEvaluacijeDTO ieDTO : dto.getIshodEvaluacije()) {
                if (ieDTO.getId() != null) {
                   
                    ishodEvaluacijeRepository.findById(ieDTO.getId())
                            .ifPresent(ishod -> {
                                ishodService.updateEntityFromDto(ieDTO, ishod); 
                                ishod.setStudentNaGodini(entity); 
                                updatedIshodi.add(ishod);
                            });
                } else {
                    
                    IshodEvaluacije newIshod = ishodService.convertToEntity(ieDTO);
                    newIshod.setStudentNaGodini(entity); 
                    updatedIshodi.add(newIshod);
                }
            }
        }
        
        entity.getIshodEvaluacije().clear();
        entity.getIshodEvaluacije().addAll(updatedIshodi);
    }
    
    public List<StudentNaGodiniDTO> findStudentNaGodiniByPredmetId(Long predmetId) {
        List<Long> grupaIds = gspRepo.findGrupaIdsByPredmetId(predmetId);

        if (grupaIds.isEmpty()) {
            return Collections.emptyList();
        }

        List<StudentNaGodini> studenti = studentNaGodiniRepository.findByGrupaStudenataIds(grupaIds);

        return studenti.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
}



