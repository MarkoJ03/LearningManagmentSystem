package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;


import server.DTOs.GodinaStudijaDTO;

import server.DTOs.StudentNaGodiniDTO;
import server.DTOs.StudijskiProgramDTO;

import server.model.GodinaStudija;

import server.model.StudentNaGodini;
import server.model.StudijskiProgram;
import server.repository.GodinaStudijaRepository;

@Service
public class GodinaStudijaService extends BaseService<GodinaStudija, GodinaStudijaDTO, Long>{


	@Autowired
	private GodinaStudijaRepository godinaStudijaRepository;
	
	@Autowired
	@Lazy
	private StudentNaGodiniService studentNaGodiniService;
	
  @Override
 protected CrudRepository<GodinaStudija, Long> getRepository() {
      return godinaStudijaRepository;
  }

	@Override
	protected GodinaStudijaDTO convertToDTO(GodinaStudija entity) {
		
		ArrayList<StudentNaGodiniDTO> studenti = new ArrayList<StudentNaGodiniDTO>();
		
		 for (StudentNaGodini s : entity.getStudentiNaGodini()) {
			 StudentNaGodiniDTO e = studentNaGodiniService.convertToDTO(s); 
			 studenti.add(e);
		 }
		return new GodinaStudijaDTO(entity.getId(),entity.getGodina(),studenti, new StudijskiProgramDTO(entity.getStudijskiProgram().getId(),entity.getStudijskiProgram().getNaziv(),null,null,null, null), null);
	}

	@Override
	protected GodinaStudija convertToEntity(GodinaStudijaDTO dto) {
	
		ArrayList<StudentNaGodini> studenti = new ArrayList<StudentNaGodini>();
		
		 for (StudentNaGodiniDTO s : dto.getStudentiNaGodini()) {
			 StudentNaGodini e = studentNaGodiniService.convertToEntity(s); 
			 studenti.add(e);
		 }
		
		 return new GodinaStudija(dto.getId(),dto.getGodina(),studenti, new StudijskiProgram(dto.getStudijskiProgram().getId(),dto.getStudijskiProgram().getNaziv(),null,null,null, null), null);		}



}