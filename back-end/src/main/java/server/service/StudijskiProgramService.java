package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.GodinaStudijaDTO;
import server.DTOs.KatedraDTO;
import server.DTOs.StudijskiProgramDTO;
import server.DTOs.TipProgramaDTO;
import server.model.GodinaStudija;
import server.model.Katedra;
import server.model.StudijskiProgram;
import server.model.TipPrograma;
import server.repository.StudijskiProgramRepository;

@Service
public class StudijskiProgramService extends BaseService<StudijskiProgram, StudijskiProgramDTO, Long>{

	@Autowired
	private StudijskiProgramRepository studijskiProgramRepository;
	
	@Autowired
	@Lazy
	private GodinaStudijaService godinaStudijaService;
	
	@Override
	protected CrudRepository<StudijskiProgram, Long> getRepository() {
		return studijskiProgramRepository;
	}

	@Override
	protected StudijskiProgramDTO convertToDTO(StudijskiProgram entity) {
		TipProgramaDTO tipPrograma = new TipProgramaDTO(entity.getTipPrograma().getId(), entity.getTipPrograma().getNaziv(),
				null);
		
		KatedraDTO katedra = new KatedraDTO(entity.getKatedra().getId(), entity.getKatedra().getNaziv(),
				null, null, null, null);
		
		ArrayList<GodinaStudijaDTO> godineStudija = new ArrayList<GodinaStudijaDTO>();
		for(GodinaStudija gs : entity.getGodineStudija()) {
			GodinaStudijaDTO gsDTO = godinaStudijaService.convertToDTO(gs);
			godineStudija.add(gsDTO);
		}
		
		return new StudijskiProgramDTO(entity.getId(), entity.getNaziv(), tipPrograma, katedra, godineStudija);
	}

	@Override
	protected StudijskiProgram convertToEntity(StudijskiProgramDTO dto) {
		TipPrograma tipPrograma = new TipPrograma(dto.getTipPrograma().getId(), dto.getTipPrograma().getNaziv(),
				null);
		
		Katedra katedra = new Katedra(dto.getKatedra().getId(), dto.getKatedra().getNaziv(),
				null, null, null, null);
		
		ArrayList<GodinaStudija> godineStudija = new ArrayList<GodinaStudija>();
		for(GodinaStudijaDTO gsDTO : dto.getGodineStudija()) {
			GodinaStudija gs = godinaStudijaService.convertToEntity(gsDTO);
			godineStudija.add(gs);
		}
		
		return new StudijskiProgram(dto.getId(), dto.getNaziv(), tipPrograma, katedra, godineStudija);
	}

}
