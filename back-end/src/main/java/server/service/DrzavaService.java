package server.service;

import java.util.ArrayList;

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


	@Autowired
	private DrzavaRepository drzavaRepository;

	@Autowired
	@Lazy
	private GradService gService;
	
  @Override
 protected CrudRepository<Drzava, Long> getRepository() {
      return drzavaRepository;
  }

	@Override
	protected DrzavaDTO convertToDTO(Drzava entity) {
		
		ArrayList<GradDTO> gradovi = new ArrayList<>();

		for (Grad o : entity.getGradovi()) {
			GradDTO oDTO = gService.convertToDTO(o);
			gradovi.add(oDTO);
		}
		
		return new DrzavaDTO(entity.getId(),entity.getNaziv(),gradovi,entity.getVidljiv());
	}

	@Override
	protected Drzava convertToEntity(DrzavaDTO dto) {
		
		ArrayList<Grad> gradovi = new ArrayList<>();

		for (GradDTO o : dto.getGradovi()) {
			Grad oDTO = gService.convertToEntity(o);
			gradovi.add(oDTO);
		}

		return new Drzava(dto.getId(),dto.getNaziv(),gradovi,dto.getVidljiv());
		}

	@Override
	protected void updateEntityFromDto(DrzavaDTO dto, Drzava entity) {
		// TODO Auto-generated method stub
		
	}



}
