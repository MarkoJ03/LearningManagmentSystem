package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.DodeljenoPravoPristupaDTO;
import server.DTOs.KorisnikDTO;
import server.DTOs.PravoPristupaDTO;
import server.model.DodeljenoPravoPristupa;
import server.model.Korisnik;
import server.model.PravoPristupa;
import server.repository.DodeljenoPravoPristupaRepository;

@Service
public class DodeljenoPravoPristupaService extends BaseService<DodeljenoPravoPristupa, DodeljenoPravoPristupaDTO, Long>{

	@Autowired
	private DodeljenoPravoPristupaRepository dodeljenoPravoPristupaRepository;
	
	@Override
	protected CrudRepository<DodeljenoPravoPristupa, Long> getRepository() {
		return dodeljenoPravoPristupaRepository;
	}

	@Override
	protected DodeljenoPravoPristupaDTO convertToDTO(DodeljenoPravoPristupa entity) {
		KorisnikDTO korisnikDTO = new KorisnikDTO(entity.getKorisnik().getId(), entity.getKorisnik().getEmail(), entity.getKorisnik().getLozinka(), null, entity.getKorisnik().getVidljiv());
		PravoPristupaDTO pravoPristupaDTO = new PravoPristupaDTO(entity.getPravoPristupa().getId(), entity.getPravoPristupa().getNaziv(), null);
		
		return new DodeljenoPravoPristupaDTO(entity.getId(), korisnikDTO, pravoPristupaDTO);
	}

	@Override
	protected DodeljenoPravoPristupa convertToEntity(DodeljenoPravoPristupaDTO dto) {
		Korisnik korisnik = new Korisnik(dto.getKorisnik().getId(), dto.getKorisnik().getEmail(), dto.getKorisnik().getLozinka(), dto.getKorisnik().getVidljiv(), null);
		PravoPristupa pravoPristupa = new PravoPristupa(dto.getPravoPristupa().getId(), dto.getPravoPristupa().getNaziv(), null);
		
		return new DodeljenoPravoPristupa(dto.getId(), korisnik, pravoPristupa);
	}

	@Override
	protected void updateEntityFromDto(DodeljenoPravoPristupaDTO dto, DodeljenoPravoPristupa entity) {
		// TODO Auto-generated method stub
		
	}

}
