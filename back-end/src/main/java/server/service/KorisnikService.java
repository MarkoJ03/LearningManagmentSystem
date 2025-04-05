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
		return new Korisnik(dto.getId(),dto.getEmail(),dto.getKorisnickoIme(),dto.getLozinka()); 	}



}










//@Service
//public class OsobaService extends BaseService<Osoba, OsobaDTO, Integer> {
//
//    @Autowired
//    private OsobaRepository osobaRepository;
//
//    @Autowired
//	@Lazy
//	private AngazovanaOsobaService angazovanaOsobaService;
//    
//    @Override
//    protected CrudRepository<Osoba, Integer> getRepository() {
//        return osobaRepository;
//    }
//    
//
//	
//
//    @Override
//    protected OsobaDTO convertToDTO(Osoba entity) {
//    	
//    	ArrayList<AngazovanaOsobaDTO> angazovanjaDTO= new ArrayList<AngazovanaOsobaDTO>();
//    	
//    	for (AngazovanaOsoba a: entity.getAngazovanja()) {
//    		angazovanjaDTO.add(new AngazovanaOsobaDTO(a.getId(),null,null,null,null));
//    	}
//    	
//        return new OsobaDTO(entity.getId(), entity.getIme(), entity.getPrezime(), entity.getEmail(),
//        		
//        		angazovanjaDTO);
//    }
//
//    @Override
//    protected Osoba convertToEntity(OsobaDTO dto) {
//        return new Osoba(dto.getId(), dto.getIme(), dto.getPrezime(), dto.getEmail(), null);
//    }
//}