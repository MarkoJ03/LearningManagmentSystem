package server.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.DodeljenoPravoPristupaDTO;
import server.DTOs.KorisnikDTO;
import server.model.DodeljenoPravoPristupa;
import server.model.Korisnik;
import server.repository.KorisnikRepository;

@Service
public class KorisnikService extends BaseService<Korisnik, KorisnikDTO, Long>{


	@Autowired
	private KorisnikRepository korisnikRepository;
	
	@Autowired
	@Lazy
	private DodeljenoPravoPristupaService dodeljenoPravoPrisupaService;

  @Override
 protected CrudRepository<Korisnik, Long> getRepository() {
      return korisnikRepository;
  }

	@Override
	protected KorisnikDTO convertToDTO(Korisnik entity) {
		Set<DodeljenoPravoPristupaDTO> dodeljenaPravaPristupa = new HashSet<>();
		
		for(DodeljenoPravoPristupa dpp: entity.getDodeljenaPravaPristupa()) {
			DodeljenoPravoPristupaDTO dppDTO = dodeljenoPravoPrisupaService.convertToDTO(dpp);
			dodeljenaPravaPristupa.add(dppDTO);
		}

		return new KorisnikDTO(entity.getId(),entity.getEmail(),entity.getLozinka(), dodeljenaPravaPristupa, entity.getVidljiv());

	}

	@Override
	protected Korisnik convertToEntity(KorisnikDTO dto) {
		// TODO Auto-generated method stub
		Set<DodeljenoPravoPristupa> dodeljenaPravaPristupa = new HashSet<>();
		
		for(DodeljenoPravoPristupaDTO dppDTO: dto.getDodeljenaPravaPristupa()) {
			DodeljenoPravoPristupa dpp = dodeljenoPravoPrisupaService.convertToEntity(dppDTO);
			dodeljenaPravaPristupa.add(dpp);
		}
		
		return new Korisnik(dto.getId(),dto.getEmail(),dto.getLozinka(), dto.getVidljiv(), dodeljenaPravaPristupa); 	
		
	}
	
	public Korisnik findByEmailAndPassword(String email, String lozinka) {
		return this.korisnikRepository.findByEmailAndPassword(email, lozinka).orElse(null);
	}
	
	public Korisnik findByEmail(String email) {
		return this.korisnikRepository.findByEmail(email).orElse(null);
	}

}










