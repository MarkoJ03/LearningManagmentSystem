package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.FakultetDTO;
import server.DTOs.UniverzitetDTO;

import server.model.Fakultet;
import server.model.Univerzitet;

import server.repository.UniverzitetRepository;

@Service
public class UniverzitetService extends BaseService<Univerzitet, UniverzitetDTO, Long>{


	@Autowired
	private UniverzitetRepository univerzitetRepository;
	
	@Autowired
	@Lazy
	private FakultetService fakultetService;
	
	@Autowired
	@Lazy
	private AdresaService adresaService;
	
	
	
  @Override
 protected CrudRepository<Univerzitet, Long> getRepository() {
      return univerzitetRepository;
  }

	@Override
	protected UniverzitetDTO convertToDTO(Univerzitet entity) {

		ArrayList<FakultetDTO> fakulteti = new ArrayList<FakultetDTO>();
		
		 for (Fakultet s : entity.getFakulteti()) {
			 FakultetDTO e = fakultetService.convertToDTO(s); 
			 fakulteti.add(e);
		 }
		
		return new UniverzitetDTO(entity.getId(),entity.getNaziv(),entity.getDatumOsnivanja(),adresaService.convertToDTO(entity.getAdresa()),fakulteti, null);
	}

	@Override
	protected Univerzitet convertToEntity(UniverzitetDTO dto) {
		
		
		ArrayList<Fakultet> fakulteti = new ArrayList<Fakultet>();
		
		 for (FakultetDTO s : dto.getFakulteti()) {
			 Fakultet e = fakultetService.convertToEntity(s); 
			 fakulteti.add(e);
		 }

		return new Univerzitet(dto.getId(),dto.getNaziv(),dto.getDatumOsnivanja(),adresaService.convertToEntity(dto.getAdresa()),fakulteti, null);
		}



}