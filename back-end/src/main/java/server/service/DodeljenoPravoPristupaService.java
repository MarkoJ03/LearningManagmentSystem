package server.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.DodeljenoPravoPristupaDTO;
import server.DTOs.KatedraNastavnikDTO;
import server.DTOs.KorisnikDTO;
import server.DTOs.PravoPristupaDTO;
import server.model.Departman;
import server.model.DodeljenoPravoPristupa;
import server.model.Korisnik;
import server.model.PravoPristupa;
import server.repository.DodeljenoPravoPristupaRepository;
import server.repository.KorisnikRepository;
import server.repository.PravoPristupaRepository;

@Service
public class DodeljenoPravoPristupaService extends BaseService<DodeljenoPravoPristupa, DodeljenoPravoPristupaDTO, Long>{

	@Autowired
	private DodeljenoPravoPristupaRepository dodeljenoPravoPristupaRepository;
	
	@Autowired
	private KorisnikRepository korisnikRepository;
	
	@Autowired
	private PravoPristupaRepository pravoPristupaRepository;
	
	@Override
	protected CrudRepository<DodeljenoPravoPristupa, Long> getRepository() {
		return dodeljenoPravoPristupaRepository;
	}


	
	@Override
	protected DodeljenoPravoPristupaDTO convertToDTO(DodeljenoPravoPristupa entity) {
	    if (entity == null) return null;

	    KorisnikDTO korisnikDTO = null;
	    if (entity.getKorisnik() != null) {
	        korisnikDTO = new KorisnikDTO(
	            entity.getKorisnik().getId(),
	            entity.getKorisnik().getEmail(),
	            null,
	            null,
	            entity.getKorisnik().getVidljiv()
	        );
	    }

	    PravoPristupaDTO pravoPristupaDTO = null;
	    if (entity.getPravoPristupa() != null) {
	        pravoPristupaDTO = new PravoPristupaDTO(
	            entity.getPravoPristupa().getId(),
	            entity.getPravoPristupa().getNaziv(),
	            null,
	            entity.getPravoPristupa().getVidljiv()
	        );
	    }

	    return new DodeljenoPravoPristupaDTO(
	        entity.getId(),
	        korisnikDTO,
	        pravoPristupaDTO,
	        entity.getVidljiv()
	    );
	}


	@Override
	protected DodeljenoPravoPristupa convertToEntity(DodeljenoPravoPristupaDTO dto) {
	    DodeljenoPravoPristupa entity = new DodeljenoPravoPristupa();
	    entity.setId(dto.getId());
	    entity.setVidljiv(dto.getVidljiv());

	    if (dto.getKorisnik() != null && dto.getKorisnik().getId() != null) {
	        Korisnik korisnik = korisnikRepository.findById(dto.getKorisnik().getId())
	                .orElseThrow(() -> new IllegalArgumentException("Korisnik nije pronađen"));
	        entity.setKorisnik(korisnik);
	    }

	    if (dto.getPravoPristupa() != null && dto.getPravoPristupa().getId() != null) {
	        PravoPristupa pravo = pravoPristupaRepository.findById(dto.getPravoPristupa().getId())
	                .orElseThrow(() -> new IllegalArgumentException("Pravo pristupa nije pronađeno"));
	        entity.setPravoPristupa(pravo);
	    }

	    return entity;
	}


	
	public List<DodeljenoPravoPristupaDTO> findByKorisnikId(Long korisnikId) {
		return dodeljenoPravoPristupaRepository.findByKorisnikIdAndVidljivTrue(korisnikId).stream()
				.map(this::convertToDTO).collect(Collectors.toList());
	}

	@Override
	protected void updateEntityFromDto(DodeljenoPravoPristupaDTO dto, DodeljenoPravoPristupa entity) {
		// TODO Auto-generated method stub
		
	}

	

}
