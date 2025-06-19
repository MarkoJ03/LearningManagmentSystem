package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;


import server.DTOs.NastavnikDTO;
import server.DTOs.StudijskiProgramDTO;
import server.DTOs.KatedraDTO;
import server.DTOs.DepartmanDTO;

import server.model.Nastavnik;
import server.model.StudijskiProgram;
import server.model.Katedra;
import server.model.Departman;
import server.repository.KatedraRepository;


@Service
public class KatedraService extends BaseService<Katedra, KatedraDTO, Long>{


	@Autowired
	private KatedraRepository katedraRepository;


	@Autowired
	@Lazy
	private StudijskiProgramService studijskiProgramService;
	
  @Override
 protected CrudRepository<Katedra, Long> getRepository() {
      return katedraRepository;
  }


	@Override
	protected KatedraDTO convertToDTO(Katedra entity) {

		ArrayList<StudijskiProgramDTO> programi = new ArrayList<>();
		for (StudijskiProgram dto1 : entity.getStudijskiProgrami()) {
			StudijskiProgramDTO s = studijskiProgramService.convertToDTO(dto1);
			programi.add(s);
		}
		
		
		return new KatedraDTO(entity.getId(),entity.getNaziv()

				,new DepartmanDTO(entity.getDepartman().getId(),entity.getDepartman().getNaziv(), null,null,null,null, null, null),
				new NastavnikDTO(entity.getSekretarKatedre().getId(),null, entity.getSekretarKatedre().getIme(),entity.getSekretarKatedre().getPrezime(),entity.getSekretarKatedre().getJmbg(),null,null,null, null,null,null,null, entity.getSekretarKatedre().getVidljiv()),
				new NastavnikDTO(entity.getSefKatedre().getId(),null, entity.getSefKatedre().getIme(),entity.getSefKatedre().getPrezime(),entity.getSefKatedre().getJmbg(),null,null,null, null,null,null,null, entity.getSefKatedre().getVidljiv()),
						null,programi, null);



	}

	@Override
	protected Katedra convertToEntity(KatedraDTO dto) {

		ArrayList<StudijskiProgram> programi = new ArrayList<>();
		for (StudijskiProgramDTO dto1 : dto.getStudijskiProgrami()) {
			StudijskiProgram s = studijskiProgramService.convertToEntity(dto1);
			programi.add(s);
		}

		return new Katedra(dto.getId(),dto.getNaziv()

				,new Departman(dto.getDepartman().getId(),dto.getDepartman().getNaziv(), null,null,null,null, null,null),
				new Nastavnik(dto.getSekretarKatedre().getId(),null, dto.getSekretarKatedre().getIme(),dto.getSekretarKatedre().getPrezime(),dto.getSekretarKatedre().getJmbg(),null,null,null, null,null,null,null, dto.getSekretarKatedre().getVidljiv()),
				new Nastavnik(dto.getSefKatedre().getId(),null, dto.getSefKatedre().getIme(),dto.getSefKatedre().getPrezime(),dto.getSefKatedre().getJmbg(),null,null,null, null,null,null,null, dto.getSefKatedre().getVidljiv()),
						null,programi, null);

		}


	@Override
	protected void updateEntityFromDto(KatedraDTO dto, Katedra entity) {
		// TODO Auto-generated method stub
		
	}



}