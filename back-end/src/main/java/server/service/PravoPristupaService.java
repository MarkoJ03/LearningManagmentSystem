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
	
//	@Override
//	protected PravoPristupaDTO convertToDTO(PravoPristupa entity) {
//	    Set<DodeljenoPravoPristupaDTO> dodeljenaPravaPristupa = new HashSet<>();
//
//	    if (entity.getDodeljenaPravaPristupa() != null) {
//	        for (DodeljenoPravoPristupa dpp : entity.getDodeljenaPravaPristupa()) {
//	            DodeljenoPravoPristupaDTO dppDTO = new DodeljenoPravoPristupaDTO();
//	            dppDTO.setId(dpp.getId());
//	            dppDTO.setKorisnik(null);
//	            dppDTO.setPravoPristupa(new PravoPristupaDTO(
//	                dpp.getPravoPristupa().getId(),
//	                dpp.getPravoPristupa().getNaziv(),
//	                null,
//	                dpp.getVidljiv()
//	            ));
//
//	            dppDTO.setVidljiv(dpp.getVidljiv());
//
//	            dodeljenaPravaPristupa.add(dppDTO);
//	        }
//	    }
//
//	    return new PravoPristupaDTO(entity.getId(), entity.getNaziv(), dodeljenaPravaPristupa, entity.getVidljiv());
//	}
//	
//	@Override
//	protected PravoPristupa convertToEntity(PravoPristupaDTO dto) {
//	    Set<DodeljenoPravoPristupa> dodeljenaPravaPristupa = new HashSet<>();
//
//	    if (dto.getDodeljenaPravaPristupa() != null) {
//	        for (DodeljenoPravoPristupaDTO dppDTO : dto.getDodeljenaPravaPristupa()) {
//
//	            Korisnik korisnik = null;
//	            if (dppDTO.getKorisnik() != null) {
//	                KorisnikDTO korisnikDTO = dppDTO.getKorisnik();
//	                korisnik = new Korisnik(
//	                    korisnikDTO.getId(),
//	                    korisnikDTO.getEmail(),
//	                    korisnikDTO.getLozinka(),
//	                    null,
//	                    korisnikDTO.getVidljiv()
//	                );
//	            } else {
//	                throw new IllegalArgumentException("KorisnikDTO inside DodeljenoPravoPristupaDTO cannot be null");
//	            }
//
//	            PravoPristupa pravoPristupa = null;
//	            if (dppDTO.getPravoPristupa() != null) {
//	                PravoPristupaDTO pravoPristupaDTO = dppDTO.getPravoPristupa();
//	                pravoPristupa = new PravoPristupa(
//	                    pravoPristupaDTO.getId(),
//	                    pravoPristupaDTO.getNaziv(),
//	                    null, 
//	                    dppDTO.getVidljiv()
//	                );
//	            } else {
//	                throw new IllegalArgumentException("PravoPristupaDTO inside DodeljenoPravoPristupaDTO cannot be null");
//	            }
//
//	            DodeljenoPravoPristupa dpp = new DodeljenoPravoPristupa(
//	                dppDTO.getId(),
//	                korisnik,
//	                pravoPristupa,
//	                dppDTO.getVidljiv()
//	            );
//
//	            dodeljenaPravaPristupa.add(dpp);
//	        }
//	    }
//
//	    return new PravoPristupa(dto.getId(), dto.getNaziv(), dodeljenaPravaPristupa, dto.getVidljiv());
//	}
	
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
