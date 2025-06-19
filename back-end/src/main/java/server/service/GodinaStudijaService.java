package server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;


import server.DTOs.GodinaStudijaDTO;
import server.DTOs.KatedraDTO;
import server.DTOs.StudentDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.DTOs.StudijskiProgramDTO;
import server.DTOs.TipProgramaDTO;
import server.model.GodinaStudija;
import server.model.Katedra;
import server.model.StudentNaGodini;
import server.model.StudentskaSluzba;
import server.model.StudijskiProgram;
import server.model.TipPrograma;
import server.repository.AdresaRepository;
import server.repository.GodinaStudijaRepository;
import server.repository.StudentNaGodiniRepository;
import server.repository.StudijskiProgramRepository;

@Service
public class GodinaStudijaService extends BaseService<GodinaStudija, GodinaStudijaDTO, Long>{

    private final AdresaRepository adresaRepository;


	@Autowired
	private GodinaStudijaRepository godinaStudijaRepository;

	@Autowired
	private StudijskiProgramRepository studijskiProgramRepository;

	@Autowired
	private StudentNaGodiniRepository studentNaGodiniRepository;

	
	@Autowired
	@Lazy
	private StudentNaGodiniService studentNaGodiniService;

	
	
    GodinaStudijaService(AdresaRepository adresaRepository) {
        this.adresaRepository = adresaRepository;
    }

    public List<GodinaStudijaDTO> findByStudijskiProgramId(Long programId) {
        return godinaStudijaRepository.findByStudijskiProgramIdAndVidljivTrue(programId)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    
  @Override
 protected CrudRepository<GodinaStudija, Long> getRepository() {
      return godinaStudijaRepository;
  }

	@Override
	protected GodinaStudijaDTO convertToDTO(GodinaStudija entity) {

		
		ArrayList<StudentNaGodiniDTO> studentiNaGodini = new ArrayList<>();

        for (StudentNaGodini e : entity.getStudentiNaGodini()) {
        	StudentNaGodiniDTO eDTO = new StudentNaGodiniDTO(
                e.getId(),
                e.getBrojIndeksa(),
        		null,
                new StudentDTO(e.getStudent().getId(),null,null,null,null,null,null,null,e.getStudent().getVidljiv()),
                null,
                null,              
                null,
                null,
                e.getVidljiv()
            );
        	studentiNaGodini.add(eDTO);
        }
		return new GodinaStudijaDTO(entity.getId(),entity.getGodina(),studentiNaGodini,new StudijskiProgramDTO(entity.getStudijskiProgram().getId(),entity.getStudijskiProgram().getNaziv(),null,null,null,entity.getStudijskiProgram().getVidljiv()),entity.getVidljiv());
		
	}

	@Override
	protected GodinaStudija convertToEntity(GodinaStudijaDTO dto) {




		GodinaStudija godinaStudija = new GodinaStudija();
		
		godinaStudija.setId(dto.getId());
		godinaStudija.setGodina(dto.getGodina());
		godinaStudija.setVidljiv(dto.getVidljiv());
		
		if (dto.getStudijskiProgram() != null && dto.getStudijskiProgram().getId() != null) {
            StudijskiProgram studijskiProgram = new StudijskiProgram();
            studijskiProgram.setId(dto.getStudijskiProgram().getId());
            godinaStudija.setStudijskiProgram(studijskiProgram);
        }
		
		
	List<StudentNaGodini> studentiList = new ArrayList<>();
    if (dto.getStudentiNaGodini() != null) {
        for (StudentNaGodiniDTO oDto : dto.getStudentiNaGodini()) {
            if (oDto.getId() == null) {
                throw new IllegalArgumentException("Obavestenje DTO must have an ID if selected from list.");
            }
            StudentNaGodini existingStudent = studentNaGodiniRepository.findById(oDto.getId())
                    .orElseThrow(() -> new RuntimeException("Obavestenje not found with id " + oDto.getId()));
            existingStudent.setGodinaStudija(godinaStudija);
            studentiList.add(existingStudent);
          
        }
    }
    godinaStudija.setStudentiNaGodini(studentiList);
    
	return godinaStudija;
    
	}
    
	@Override
	protected void updateEntityFromDto(GodinaStudijaDTO dto, GodinaStudija entity) {

		GodinaStudija godinaStudija = new GodinaStudija();
		
		godinaStudija.setGodina(dto.getGodina());
		godinaStudija.setVidljiv(dto.getVidljiv());
		
		if (dto.getStudijskiProgram() != null && dto.getStudijskiProgram().getId() != null) {
			studijskiProgramRepository.findById(dto.getStudijskiProgram().getId())
                .ifPresent(entity::setStudijskiProgram);
        }
		
		
	
	
	List<StudentNaGodini> updatedStudenti = new ArrayList<>();
	if (dto.getStudentiNaGodini() != null) {
		for (StudentNaGodiniDTO sngDTO : dto.getStudentiNaGodini()) {
			if (sngDTO.getId() != null) {
				studentNaGodiniRepository.findById(sngDTO.getId()).ifPresent(updatedStudenti::add);
			}
		}
	}
	entity.getStudentiNaGodini().clear();
	for (StudentNaGodini sng : updatedStudenti) {
		sng.setGodinaStudija(entity);
		entity.getStudentiNaGodini().add(sng);
	}

	}

	}


