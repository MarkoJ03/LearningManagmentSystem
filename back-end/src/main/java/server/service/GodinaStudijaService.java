package server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;


import server.DTOs.GodinaStudijaDTO;

import server.DTOs.StudentNaGodiniDTO;
import server.DTOs.StudijskiProgramDTO;
import server.DTOs.TipProgramaDTO;
import server.model.GodinaStudija;

import server.model.StudentNaGodini;
import server.model.StudijskiProgram;
import server.model.TipPrograma;
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

//		ArrayList<StudentNaGodiniDTO> studenti = new ArrayList<>();
//
//		 for (StudentNaGodini s : entity.getStudentiNaGodini()) {
//			 StudentNaGodiniDTO e = studentNaGodiniService.convertToDTO(s);
//			 studenti.add(e);
//		 }

		return new GodinaStudijaDTO(entity.getId(),entity.getGodina(),null, new StudijskiProgramDTO(entity.getStudijskiProgram().getId(),entity.getStudijskiProgram().getNaziv(),new TipProgramaDTO(null,entity.getStudijskiProgram().getTipPrograma().getNaziv(),null,entity.getStudijskiProgram().getTipPrograma().getVidljiv()),null,null, null), null);


	}

	@Override
	protected GodinaStudija convertToEntity(GodinaStudijaDTO dto) {

//		ArrayList<StudentNaGodini> studenti = new ArrayList<>();
//
//		 for (StudentNaGodiniDTO s : dto.getStudentiNaGodini()) {
//			 StudentNaGodini e = studentNaGodiniService.convertToEntity(s);
//			 studenti.add(e);
//		 }


		 return new GodinaStudija(dto.getId(),dto.getGodina(),null, new StudijskiProgram(dto.getStudijskiProgram().getId(),dto.getStudijskiProgram().getNaziv(),new TipPrograma(null,dto.getStudijskiProgram().getTipPrograma().getNaziv(),null,dto.getStudijskiProgram().getTipPrograma().getVidljiv()),null,null, null), null);		}

	public List<GodinaStudijaDTO> findByStudijskiProgramId(Long programId) {
	    return godinaStudijaRepository.findByStudijskiProgramIdAndVidljivTrue(programId)
	        .stream()
	        .map(this::convertToDTO)
	        .collect(Collectors.toList());
	}


}