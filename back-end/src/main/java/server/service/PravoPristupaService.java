package server.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.DodeljenoPravoPristupaDTO;
import server.DTOs.PravoPristupaDTO;
import server.model.DodeljenoPravoPristupa;
import server.model.PravoPristupa;
import server.repository.PravoPristupaRepository;

@Service
public class PravoPristupaService extends BaseService<PravoPristupa, PravoPristupaDTO, Long>{

	@Autowired
	private PravoPristupaRepository pravoPristupaRepository;
	
	@Autowired
	@Lazy
	private DodeljenoPravoPristupaService dodeljenoPravoPristupaService;
	
	@Override
	protected CrudRepository<PravoPristupa, Long> getRepository() {
		return pravoPristupaRepository;
	}

	@Override
	protected PravoPristupaDTO convertToDTO(PravoPristupa entity) {
		Set<DodeljenoPravoPristupaDTO> dodeljenaPravaPristupa = new HashSet<>();
		
		for(DodeljenoPravoPristupa dpp : entity.getDodeljenaPravaPristupa()) {
			DodeljenoPravoPristupaDTO dppDTO = dodeljenoPravoPristupaService.convertToDTO(dpp);
			dodeljenaPravaPristupa.add(dppDTO);
		}
		return new PravoPristupaDTO(entity.getId(), entity.getNaziv(), dodeljenaPravaPristupa);
	}

	@Override
	protected PravoPristupa convertToEntity(PravoPristupaDTO dto) {
		Set<DodeljenoPravoPristupa> dodeljenaPravaPristupa = new HashSet<>();
		
		for(DodeljenoPravoPristupaDTO dppDTO : dto.getDodeljenaPravaPristupa()) {
			DodeljenoPravoPristupa dpp = dodeljenoPravoPristupaService.convertToEntity(dppDTO);
			dodeljenaPravaPristupa.add(dpp);
		}
		
		return new PravoPristupa(dto.getId(), dto.getNaziv(), dodeljenaPravaPristupa);
	}

	@Override
	protected void updateEntityFromDto(PravoPristupaDTO dto, PravoPristupa entity) {
		// TODO Auto-generated method stub
		
	}

}
