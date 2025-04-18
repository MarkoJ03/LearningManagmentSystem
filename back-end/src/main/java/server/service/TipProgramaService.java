package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.StudijskiProgramDTO;
import server.DTOs.TipProgramaDTO;
import server.model.StudijskiProgram;
import server.model.TipPrograma;
import server.repository.TipProgramaRepository;

@Service
public class TipProgramaService extends BaseService<TipPrograma, TipProgramaDTO, Long>{

	@Autowired
	private TipProgramaRepository tipProgramaRepository;

	@Autowired
	@Lazy
	private StudijskiProgramService studijskiProgramService;

	@Override
	protected CrudRepository<TipPrograma, Long> getRepository() {
		return tipProgramaRepository;
	}

	@Override
	protected TipProgramaDTO convertToDTO(TipPrograma entity) {
		ArrayList<StudijskiProgramDTO> studijskiProgrami = new ArrayList<>();
		for(StudijskiProgram sp : entity.getProgrami()) {
			StudijskiProgramDTO spDTO = studijskiProgramService.convertToDTO(sp);
			studijskiProgrami.add(spDTO);
		}

		return new TipProgramaDTO(entity.getId(), entity.getNaziv(), studijskiProgrami, entity.getVidljiv());
	}

	@Override
	protected TipPrograma convertToEntity(TipProgramaDTO dto) {
		ArrayList<StudijskiProgram> studijskiProgrami = new ArrayList<>();
		for(StudijskiProgramDTO spDTO : dto.getProgrami()) {
			StudijskiProgram sp = studijskiProgramService.convertToEntity(spDTO);
			studijskiProgrami.add(sp);
		}

		return new TipPrograma(dto.getId(), dto.getNaziv(), studijskiProgrami, dto.getVidljiv());
	}

}
