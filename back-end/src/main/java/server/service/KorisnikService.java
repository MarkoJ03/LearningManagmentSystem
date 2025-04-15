package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.KorisnikDTO;
import server.model.Korisnik;
import server.repository.KorisnikRepository;

@Service
public class KorisnikService extends BaseService<Korisnik, KorisnikDTO, Long>{


	@Autowired
	private KorisnikRepository korisnikRepository;
	
  @Override
 protected CrudRepository<Korisnik, Long> getRepository() {
      return korisnikRepository;
  }

	@Override
	protected KorisnikDTO convertToDTO(Korisnik entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected Korisnik convertToEntity(KorisnikDTO dto) {
		// TODO Auto-generated method stub
		return new Korisnik(dto.getId(),dto.getEmail(),dto.getKorisnickoIme(),dto.getLozinka(), null); 	}



}










