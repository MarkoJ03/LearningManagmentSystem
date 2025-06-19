package server.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.DodeljenoPravoPristupaDTO;
import server.DTOs.KorisnikDTO;
import server.DTOs.PravoPristupaDTO;
import server.model.DodeljenoPravoPristupa;
import server.model.Korisnik;
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
	        Set<DodeljenoPravoPristupaDTO> dodeljenaPravaDTO = new HashSet<>();
	        if (entity.getDodeljenaPravaPristupa() != null) {
	            for (DodeljenoPravoPristupa dp : entity.getDodeljenaPravaPristupa()) {
	                dodeljenaPravaDTO.add(dodeljenoPravoPristupaService.convertToDTO(dp));
	            }
	        }

	        return new PravoPristupaDTO(
	            entity.getId(),
	            entity.getNaziv(),
	            dodeljenaPravaDTO,
	            entity.getVidljiv()
	        );
	    }

	    @Override
	    protected PravoPristupa convertToEntity(PravoPristupaDTO dto) {
	        PravoPristupa pravo = new PravoPristupa();
	        pravo.setId(dto.getId());
	        pravo.setNaziv(dto.getNaziv());

	        Set<DodeljenoPravoPristupa> dodeljenaPrava = new HashSet<>();
	        if (dto.getDodeljenaPravaPristupa() != null) {
	            for (DodeljenoPravoPristupaDTO dpDTO : dto.getDodeljenaPravaPristupa()) {
	                DodeljenoPravoPristupa dp = dodeljenoPravoPristupaService.convertToEntity(dpDTO);
	                dp.setPravoPristupa(pravo); // setovanje veze unazad
	                dodeljenaPrava.add(dp);
	            }
	        }

	        pravo.setDodeljenaPravaPristupa(dodeljenaPrava);
	        pravo.setVidljiv(dto.getVidljiv());

	        return pravo;
	    }

		@Override
		protected void updateEntityFromDto(PravoPristupaDTO dto, PravoPristupa entity) {
			// TODO Auto-generated method stub
			
		}


	

}
