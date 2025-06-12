package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.KorisnikDTO;
import server.DTOs.SilabusDTO;
import server.DTOs.SilabusTerminDTO;
import server.DTOs.ObavestenjeDTO;
import server.DTOs.RealizacijaPredmetaDTO;
import server.DTOs.ZvanjeDTO;

import server.model.Korisnik;
import server.model.Silabus;
import server.model.SilabusTermin;
import server.model.Obavestenje;
import server.model.RealizacijaPredmeta;
import server.model.Zvanje;
import server.repository.SilabusRepository;

@Service
public class SilabusService extends BaseService<Silabus, SilabusDTO, Long> {

	@Autowired
	private SilabusRepository silabusRepository;







	@Autowired
	@Lazy
	private SilabusTerminService stService;

	@Override
	protected CrudRepository<Silabus, Long> getRepository() {
		return silabusRepository;
	}

	@Override
	protected SilabusDTO convertToDTO(Silabus entity) {
		

		ArrayList<SilabusTerminDTO> termini = new ArrayList<>();
		for (SilabusTermin t : entity.getTermini()) {
			SilabusTerminDTO zDTO = stService.convertToDTO(t);
			termini.add(zDTO);
		}

		return new SilabusDTO(entity.getId(), termini, entity.getVidljiv());
	}

	@Override
	protected Silabus convertToEntity(SilabusDTO dto) {
		
		

		ArrayList<SilabusTermin> termini = new ArrayList<>();
		for (SilabusTerminDTO t : dto.getTermini()) {
			SilabusTermin zDTO = stService.convertToEntity(t);
			termini.add(zDTO);
		}

		return new Silabus(dto.getId(), termini, dto.getVidljiv());
	}

	@Override
	protected void updateEntityFromDto(SilabusDTO dto, Silabus entity) {
		// TODO Auto-generated method stub
		
	}

}