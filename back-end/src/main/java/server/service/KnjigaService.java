package server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.BibliotekaDTO;
import server.DTOs.BibliotekaKnjigaDTO;
import server.DTOs.KnjigaDTO;
import server.model.Biblioteka;
import server.model.BibliotekaKnjiga;
import server.model.Knjiga;
import server.repository.BibliotekaRepository;
import server.repository.KnjigaRepository;


@Service
public class KnjigaService extends BaseService<Knjiga, KnjigaDTO, Long> {

    @Autowired
    private KnjigaRepository knjigaRepository;
    
    @Autowired
    private BibliotekaRepository bibliotekaRepository;


    @Override
    protected CrudRepository<Knjiga, Long> getRepository() {
        return knjigaRepository;
    }

    @Override
    protected KnjigaDTO convertToDTO(Knjiga entity) {
    	
    	List<BibliotekaKnjigaDTO> bibliotekaKnjigaDTO = entity.getBiblioteke() != null ? 
                entity.getBiblioteke().stream()
                    .map(kn -> {
                        BibliotekaDTO bibliotekaDTO = null;
                        if (kn.getBiblioteka() != null) {
                            bibliotekaDTO = new BibliotekaDTO(kn.getBiblioteka().getId(),null,null,kn.getBiblioteka().getVidljiv() );
                        }
                        return new BibliotekaKnjigaDTO(kn.getId(), bibliotekaDTO, null, kn.getVidljiv());
                    })
                    .collect(Collectors.toList()) :
                new ArrayList<>();
    	
    	
        return new KnjigaDTO(
                entity.getId(),
                entity.getNaziv(),
                entity.getISBN(),
                bibliotekaKnjigaDTO,  
                entity.getVidljiv()
        );
    }

    @Override
    protected Knjiga convertToEntity(KnjigaDTO dto) {
    	
    	Knjiga knjiga = new Knjiga();
    	
    	knjiga.setId(dto.getId());
    	knjiga.setNaziv(dto.getNaziv());
    	knjiga.setISBN(dto.getISBN());
    	knjiga.setVidljiv(dto.getVidljiv());
    	
    	return knjiga;
    	
        
    }

    @Override
    protected void updateEntityFromDto(KnjigaDTO dto, Knjiga entity) {
    	entity.getBiblioteke().clear();
    	
    	
    	
    	entity.setVidljiv(dto.getVidljiv());
    	
    	List<BibliotekaKnjiga> updatedLinksD = new ArrayList<>();
        if (dto.getBiblioteke() != null) {
            for (BibliotekaKnjigaDTO dnDTO : dto.getBiblioteke()) {
                if (dnDTO.getKnjiga() != null && dnDTO.getKnjiga().getId() != null) {
                    Optional<Biblioteka> optDepartman = bibliotekaRepository.findById(dnDTO.getBiblioteka().getId());
                    if (optDepartman.isPresent()) {
                        BibliotekaKnjiga dn = new BibliotekaKnjiga();
                        dn.setBiblioteka(optDepartman.get());;
                        dn.setKnjiga(entity);
                        dn.setVidljiv(dnDTO.getVidljiv() != null ? dnDTO.getVidljiv() : true);
                        updatedLinksD.add(dn);
                    }
                }
            }
        }
        
        entity.getBiblioteke().addAll(updatedLinksD);

}

}
