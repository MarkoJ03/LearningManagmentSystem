package server.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import server.DTOs.DodeljenoPravoPristupaDTO;
import server.DTOs.KorisnikDTO;
import server.DTOs.PravoPristupaDTO;
import server.model.DodeljenoPravoPristupa;
import server.model.Korisnik;
import server.model.PravoPristupa;
import server.repository.KorisnikRepository;
import server.repository.PravoPristupaRepository;

@Service
public class KorisnikService extends BaseService<Korisnik, KorisnikDTO, Long>{


	@Autowired
	private KorisnikRepository korisnikRepository;
	
	@Autowired
	@Lazy
	private DodeljenoPravoPristupaService dodeljenoPravoPristupaService;

	@Autowired
    private PravoPristupaRepository pravoPristupaRepository;
	
  @Override
 protected CrudRepository<Korisnik, Long> getRepository() {
      return korisnikRepository;
  }
  
  @Transactional // Ensure the session is open for eager loading
  @Override
  public List<KorisnikDTO> findAll() {
      return StreamSupport.stream(getRepository().findAll().spliterator(), false)
              .map(this::convertToDTO)
              .collect(Collectors.toList());
  }
 
  
  @Override
  protected KorisnikDTO convertToDTO(Korisnik entity) {
      Set<DodeljenoPravoPristupaDTO> pravaDTO = new HashSet<>();
      if (entity.getDodeljenaPravaPristupa() != null) {
          for (DodeljenoPravoPristupa pravo : entity.getDodeljenaPravaPristupa()) {
              pravaDTO.add(dodeljenoPravoPristupaService.convertToDTO(pravo));
          }
      }

      return new KorisnikDTO(
          entity.getId(),
          entity.getEmail(),
          null, // iz sigurnosnih razloga ne vraćamo lozinku u DTO
          pravaDTO,
          entity.getVidljiv()
      );
  }

  @Override
  protected Korisnik convertToEntity(KorisnikDTO dto) {
      Korisnik korisnik = new Korisnik();
      korisnik.setId(dto.getId());
      korisnik.setEmail(dto.getEmail());
      korisnik.setLozinka(dto.getLozinka());  


      Set<DodeljenoPravoPristupa> pravaEntiteti = new HashSet<>();
      if (dto.getDodeljenaPravaPristupa() != null) {
          for (DodeljenoPravoPristupaDTO pravoDTO : dto.getDodeljenaPravaPristupa()) {
              DodeljenoPravoPristupa dp = dodeljenoPravoPristupaService.convertToEntity(pravoDTO);
              dp.setKorisnik(korisnik); 
              pravaEntiteti.add(dp);
          }
      }

      korisnik.setDodeljenaPravaPristupa(pravaEntiteti);
      korisnik.setVidljiv(dto.getVidljiv());

      return korisnik;
  }
	
	public Korisnik findByEmailAndLozinka(String email, String lozinka) {
		return this.korisnikRepository.findByEmailAndLozinka(email, lozinka).orElse(null);
	}
	
	@Transactional
	public Korisnik findByEmail(String email) {
		return this.korisnikRepository.findByEmail(email).orElse(null);
	}
	
	@Transactional
    public Korisnik findByEmailWithPrivileges(String email) {
        return korisnikRepository.findByEmailWithDodeljenaPravaPristupa(email);
    }

	@Override
	protected void updateEntityFromDto(KorisnikDTO dto, Korisnik entity) {
	    // Basic scalar updates
	    entity.setEmail(dto.getEmail());

	    if (dto.getLozinka() != null && !dto.getLozinka().isBlank()) {
	        entity.setLozinka(dto.getLozinka());
	    }

	    entity.setVidljiv(dto.getVidljiv());

	    Map<Long, DodeljenoPravoPristupa> existingPravaMap = entity.getDodeljenaPravaPristupa()
	            .stream()
	            .filter(dp -> dp.getId() != null) 
	            .collect(Collectors.toMap(DodeljenoPravoPristupa::getId, Function.identity()));

	    Set<Long> dtoPravaIds = new HashSet<>();
	    if (dto.getDodeljenaPravaPristupa() != null) {
	        dtoPravaIds = dto.getDodeljenaPravaPristupa().stream()
	                .filter(dtoPravo -> dtoPravo.getId() != null)
	                .map(DodeljenoPravoPristupaDTO::getId)
	                .collect(Collectors.toSet());
	    }

	    Iterator<DodeljenoPravoPristupa> iterator = entity.getDodeljenaPravaPristupa().iterator();
	    while (iterator.hasNext()) {
	        DodeljenoPravoPristupa existingPravo = iterator.next();
	        if (existingPravo.getId() != null && !dtoPravaIds.contains(existingPravo.getId())) {
	            iterator.remove(); 
	        }
	    }

	    if (dto.getDodeljenaPravaPristupa() != null) {
	        for (DodeljenoPravoPristupaDTO dtoPravo : dto.getDodeljenaPravaPristupa()) {
	            DodeljenoPravoPristupa dp;

	            if (dtoPravo.getId() != null && existingPravaMap.containsKey(dtoPravo.getId())) {
	                dp = existingPravaMap.get(dtoPravo.getId());
	            } else {
	                dp = new DodeljenoPravoPristupa();
	                entity.getDodeljenaPravaPristupa().add(dp); 
	            }

	            dp.setVidljiv(dtoPravo.getVidljiv());
	            dp.setKorisnik(entity); // set back-reference

	            if (dtoPravo.getPravoPristupa() != null && dtoPravo.getPravoPristupa().getId() != null) {
	                PravoPristupa pravo = pravoPristupaRepository
	                        .findById(dtoPravo.getPravoPristupa().getId())
	                        .orElse(null); 
	                dp.setPravoPristupa(pravo);
	            }
	        }
	    }
	}


}










