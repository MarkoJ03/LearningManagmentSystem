//package server.service;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Objects;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Lazy;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Service;
//
//import jakarta.transaction.Transactional;
//import server.DTOs.FakultetDTO;
//import server.DTOs.UniverzitetDTO;
//import server.model.Adresa;
//import server.model.Fakultet;
//import server.model.Univerzitet;
//import server.repository.AdresaRepository;
//import server.repository.UniverzitetRepository;
//
//@Service
//public class UniverzitetService extends BaseService<Univerzitet, UniverzitetDTO, Long>{
//
//
//	@Autowired
//	private UniverzitetRepository univerzitetRepository;
//
//	@Autowired
//	@Lazy
//	private FakultetService fakultetService;
//
//	@Autowired
//	@Lazy
//	private AdresaService adresaService;
//
//	@Autowired
//    private AdresaRepository adresaRepository;
//
//  @Override
// protected CrudRepository<Univerzitet, Long> getRepository() {
//      return univerzitetRepository;
//  }
//
//	@Override
//	protected UniverzitetDTO convertToDTO(Univerzitet entity) {
//
//		List<FakultetDTO> fakulteti = new ArrayList<>();
//
//        if (entity.getFakulteti() != null) {
//            for (Fakultet f : entity.getFakulteti()) {
//                fakulteti.add(new FakultetDTO(
//                    f.getId(),
//                    f.getNaziv(),
//                    null, 
//                    null, 
//                    f.getVidljiv()
//                ));
//            }
//        }
//
//        return new UniverzitetDTO(entity.getId(), entity.getNaziv(), entity.getDatumOsnivanja(),
//                adresaService.convertToDTO(entity.getAdresa()), fakulteti, entity.getEmail(), entity.getKontakt(),
//                entity.getVidljiv());
//
//	}
//
//	@Override
//    protected Univerzitet convertToEntity(UniverzitetDTO dto) {
//        // This method is primarily for creating *new* Univerzitet entities.
//        Univerzitet entity = new Univerzitet();
//
//        entity.setNaziv(dto.getNaziv());
//        entity.setDatumOsnivanja(dto.getDatumOsnivanja());
//        entity.setEmail(dto.getEmail());
//        entity.setKontakt(dto.getKontakt());
//        entity.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true);
//
//        // Handle Adresa for creation
//        Adresa adresa;
//        if (dto.getAdresa() == null) {
//            throw new IllegalArgumentException("Adresa je obavezno polje za Univerzitet.");
//        }
//
//        if (dto.getAdresa().getId() != null) {
//            // Linking an existing address to a NEW university. Fetch the existing address.
//            adresa = adresaRepository.findById(dto.getAdresa().getId())
//                    .orElseThrow(() -> new IllegalArgumentException("Adresa sa ID " + dto.getAdresa().getId() + " ne postoji."));
//            // Optionally update existing address properties if needed when linking
//            // adresaService.updateEntityFromDto(adresa, dto.getAdresa());
//        } else {
//            // New address: convert it. It will be cascaded and persisted with the university.
//            adresa = adresaService.convertToEntity(dto.getAdresa());
//        }
//        entity.setAdresa(adresa);
//
//        // Handle Fakulteti for creation
//        List<Fakultet> fakulteti = new ArrayList<>(); // Use List to match entity
//        if (dto.getFakulteti() != null) {
//            for (FakultetDTO fakultetDto : dto.getFakulteti()) {
//                Fakultet fakultet;
//                if (fakultetDto.getId() != null) {
//                    // Scenario: Creating a NEW university, but linking an EXISTING faculty.
//                    // This faculty MUST be loaded from the database to be managed.
//                    fakultet = fakultetService.getRepository().findById(fakultetDto.getId())
//                               .orElseThrow(() -> new IllegalArgumentException("Fakultet sa ID " + fakultetDto.getId() + " ne postoji."));
//                    // Update the existing faculty's properties if the DTO provides them
//                    fakultetService.updateEntityFromDto(fakultetDto, fakultet); // Pass entity first, then DTO
//                } else {
//                    // Scenario: Creating a NEW university, and this is a NEW faculty.
//                    // convertToEntity will create a transient Fakultet.
//                    fakultet = fakultetService.convertToEntity(fakultetDto);
//                }
//                fakultet.setUniverzitet(entity); // Crucial: Link the child to the parent
//                fakulteti.add(fakultet);
//            }
//        }
//        entity.setFakulteti(fakulteti);
//
//        return entity;
//    }
//
//	@Override
//    @Transactional 
//    protected void updateEntityFromDto(UniverzitetDTO dto, Univerzitet entity) {
//        if (dto.getNaziv() != null) {
//            entity.setNaziv(dto.getNaziv());
//        }
//        if (dto.getDatumOsnivanja() != null) {
//            entity.setDatumOsnivanja(dto.getDatumOsnivanja());
//        }
//        if (dto.getEmail() != null) {
//            entity.setEmail(dto.getEmail());
//        }
//        if (dto.getKontakt() != null) {
//            entity.setKontakt(dto.getKontakt());
//        }
//        if (dto.getVidljiv() != null) {
//            entity.setVidljiv(dto.getVidljiv());
//        }
//
//        if (dto.getAdresa() == null) {
//            throw new IllegalArgumentException("Adresa je obavezno polje i ne može biti null prilikom ažuriranja Univerziteta.");
//        }
//
//        if (dto.getAdresa().getId() != null) {
//            Adresa existingAdresa = adresaRepository.findById(dto.getAdresa().getId())
//                    .orElseThrow(() -> new IllegalArgumentException("Adresa sa ID " + dto.getAdresa().getId() + " ne postoji."));
//            entity.setAdresa(existingAdresa); 
//            adresaService.updateEntityFromDto(dto.getAdresa(), existingAdresa); // Update properties of the existing address
//        } else {
//            Adresa newAdresa = adresaService.convertToEntity(dto.getAdresa());
//            entity.setAdresa(newAdresa); 
//        }
//
//        List<Fakultet> facultiesToPersist = new ArrayList<>();
//
//        if (dto.getFakulteti() != null) {
//            for (FakultetDTO fakultetDto : dto.getFakulteti()) {
//                Fakultet fakultet;
//                if (fakultetDto.getId() != null) {
//                    fakultet = fakultetService.getRepository().findById(fakultetDto.getId())
//                        .orElseThrow(() -> new IllegalArgumentException("Fakultet sa ID " + fakultetDto.getId() + " ne postoji."));
//
//                    fakultetService.updateEntityFromDto(fakultetDto, fakultet);
//
//                } else {
//                    fakultet = fakultetService.convertToEntity(fakultetDto);
//                }
//                fakultet.setUniverzitet(entity);
//                facultiesToPersist.add(fakultet);
//            }
//        }
//
//        entity.getFakulteti().clear(); 
//        entity.getFakulteti().addAll(facultiesToPersist); 
//    }
//}

package server.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import server.DTOs.AdresaDTO;
import server.DTOs.FakultetDTO;
import server.DTOs.UniverzitetDTO;
import server.model.Adresa;
import server.model.Fakultet;
import server.model.Univerzitet;
import server.repository.AdresaRepository;
import server.repository.FakultetRepository;
import server.repository.UniverzitetRepository;

@Service
public class UniverzitetService extends BaseService<Univerzitet, UniverzitetDTO, Long>{

    @Autowired
    private UniverzitetRepository univerzitetRepository;

    @Autowired
    @Lazy
    private FakultetService fakultetService;

    @Autowired
    @Lazy
    private AdresaService adresaService;

    @Autowired
    private AdresaRepository adresaRepository;

    @Autowired
    @Lazy
    private GradService gService;
    
    @Autowired
    private FakultetRepository fakultetRepository;

    @Override
    protected CrudRepository<Univerzitet, Long> getRepository() {
        return univerzitetRepository;
    }


    @Override
    protected UniverzitetDTO convertToDTO(Univerzitet entity) {
    	ArrayList<FakultetDTO> fakulteti = new ArrayList<>();
    	for (Fakultet fDTO : entity.getFakulteti()) {
    		FakultetDTO f = fakultetService.convertToDTO(fDTO);
    		fakulteti.add(f);
    	}
    	//namesti grad
    	return new UniverzitetDTO(entity.getId(), entity.getNaziv(), entity.getDatumOsnivanja(),
    			new AdresaDTO(entity.getAdresa().getId(), null,entity.getAdresa().getUlica(), entity.getAdresa().getBroj(), null), 
    			fakulteti, entity.getEmail(), entity.getKontakt(), entity.getVidljiv());
    }

    @Override
    protected Univerzitet convertToEntity(UniverzitetDTO dto) {
    	Univerzitet univerzitet = new Univerzitet();
    	univerzitet.setId(dto.getId());
    	univerzitet.setNaziv(dto.getNaziv());
    	univerzitet.setDatumOsnivanja(dto.getDatumOsnivanja());
    	univerzitet.setEmail(dto.getEmail());
    	univerzitet.setKontakt(dto.getKontakt());
    	univerzitet.setVidljiv(dto.getVidljiv());
    	
    	if (dto.getAdresa() != null && dto.getAdresa().getId() != null) {
    		Adresa adresa = new Adresa();
    		adresa.setId(dto.getAdresa().getId());
    		univerzitet.setAdresa(adresa);
    	}
    	
    	ArrayList<Fakultet> fakulteti = new ArrayList<>();
    	
    	if (dto.getFakulteti() != null) {
    		for (FakultetDTO fDTO : dto.getFakulteti()) {
    			if (fDTO.getId() != null) {
    				
    				Fakultet existingFakultet = fakultetService.getRepository().findById(fDTO.getId())
    						.orElseThrow(() -> new RuntimeException("Fakultet not found with " + fDTO.getId()));
    			
    				existingFakultet.setUniverzitet(univerzitet);
    				
    				fakulteti.add(existingFakultet);
    			}
    		}
    	}
    	
    	univerzitet.setFakulteti(fakulteti);
    	return univerzitet;
    }

    @Override
    @Transactional
    protected void updateEntityFromDto(UniverzitetDTO dto, Univerzitet entity) {
        if (dto.getNaziv() != null) {
            entity.setNaziv(dto.getNaziv());
        }
        if (dto.getDatumOsnivanja() != null) {
            entity.setDatumOsnivanja(dto.getDatumOsnivanja());
        }
        if (dto.getEmail() != null) {
            entity.setEmail(dto.getEmail());
        }
        if (dto.getKontakt() != null) {
            entity.setKontakt(dto.getKontakt());
        }
        if (dto.getVidljiv() != null) {
            entity.setVidljiv(dto.getVidljiv());
        }
        
        if (dto.getAdresa() != null && dto.getAdresa().getId() != null) {
        	Adresa adresa = new Adresa();
        	adresa.setId(dto.getAdresa().getId());
        	entity.setAdresa(adresa);
        }
        
        List<Fakultet> updatedFakulteti = new ArrayList<>();
        if (dto.getFakulteti() != null) {
        	for (FakultetDTO fDTO : dto.getFakulteti()) {
        		if (fDTO.getId() != null) {
        			fakultetRepository.findById(fDTO.getId())
        			.ifPresent(updatedFakulteti::add);
        		}
        	}
        }
        entity.getFakulteti().clear();
        for (Fakultet f : updatedFakulteti) {
        	f.setUniverzitet(entity);
        	entity.getFakulteti().add(f);
        }
    }
}