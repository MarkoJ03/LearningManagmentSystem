package server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;


import server.DTOs.DrzavaDTO;
import server.DTOs.GradDTO;
import server.DTOs.ObavestenjeDTO;
import server.model.Drzava;
import server.model.Grad;
import server.model.Obavestenje;
import server.repository.DrzavaRepository;

@Service
public class DrzavaService extends BaseService<Drzava, DrzavaDTO, Long>{

    private final StudentNaGodiniService studentNaGodiniService;


	@Autowired
	private DrzavaRepository drzavaRepository;

	@Autowired
	@Lazy
	private GradService gService;

    DrzavaService(StudentNaGodiniService studentNaGodiniService) {
        this.studentNaGodiniService = studentNaGodiniService;
    }
	
  @Override
 protected CrudRepository<Drzava, Long> getRepository() {
      return drzavaRepository;
  }

	@Override
	protected DrzavaDTO convertToDTO(Drzava entity) {
//		
//		ArrayList<GradDTO> gradovi = new ArrayList<>();
//
//		for (Grad o : entity.getGradovi()) {
//			GradDTO oDTO = gService.convertToDTO(o);
//			gradovi.add(oDTO);
//		}
//		
		

ArrayList<GradDTO> grad = new ArrayList<>();

		for (Grad e : entity.getGradovi()) {
            GradDTO eDTO = new GradDTO(
                e.getId(),
                e.getNaziv(),
                null,
                
                e.getVidljiv()
            );
            grad.add(eDTO);
        }
		
		
		return new DrzavaDTO(entity.getId(),entity.getNaziv(),grad,entity.getVidljiv());
	}

	@Override
	protected Drzava convertToEntity(DrzavaDTO dto) {
		
		Drzava drzava = new Drzava();
		
		drzava.setNaziv(dto.getNaziv());
		drzava.setVidljiv(dto.getVidljiv());
		
		ArrayList<Grad> gradovi = new ArrayList<>();

		if (dto.getGradovi() != null) {
			for (GradDTO eDto : dto.getGradovi()) {
				if (eDto.getId() != null) {

					Grad grad = gService.getRepository().findById(eDto.getId())
							.orElseThrow(() -> new RuntimeException("Evaluacija znanja not found with id " + eDto.getId()));

					
					grad.setDrzava(drzava);
					
					
					
					gradovi.add(grad);
				}
			}
		}

		drzava.setGradovi(gradovi);
		
		

		return new Drzava(dto.getId(),dto.getNaziv(),gradovi,dto.getVidljiv());
		}

	@Override
	protected void updateEntityFromDto(DrzavaDTO dto, Drzava entity) {

		Drzava drzava = new Drzava();
	    entity.setNaziv(dto.getNaziv());
	    entity.setVidljiv(dto.getVidljiv());
List<Grad> updatedEvaluacije = new ArrayList<>();


	    if (dto.getGradovi() != null) {
	        for (GradDTO ezDTO : dto.getGradovi()) {
	            if (ezDTO.getId() != null) {
	                gService.getRepository().findById(ezDTO.getId())
	                    .ifPresent(updatedEvaluacije::add);
	            }
	        }
	    }
	    entity.getGradovi().clear();
	    for (Grad ez : updatedEvaluacije) {
	        ez.setDrzava(entity);
	        entity.getGradovi().add(ez);
	    }		
	    
	}
	

			
}
