package server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.Entity;
import server.DTOs.BibliotekaDTO;
import server.DTOs.BibliotekaKnjigaDTO;
import server.DTOs.KnjigaDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.DTOs.StudentskaSluzbaDTO;
import server.model.Biblioteka;
import server.model.BibliotekaKnjiga;
import server.model.Knjiga;
import server.model.StudentNaGodini;
import server.model.StudentskaSluzba;
import server.repository.BibliotekaRepository;
import server.repository.KnjigaRepository;
import server.repository.StudentskaSluzbaRepository;

@Service
public class BibliotekaService extends BaseService<Biblioteka, BibliotekaDTO, Long> {
	
	@Autowired
    private StudentskaSluzbaRepository studentskaSluzbaRepository;

    @Autowired
    private BibliotekaRepository bibliotekaRepository;
    
    @Autowired 
    private KnjigaRepository knjigaRespository;
    
    @Autowired
    @Lazy
    private BibliotekaKnjigaService bkService;
    
    @Autowired
    @Lazy
    private KnjigaService knjigaService;

    @Autowired
    @Lazy
    private StudentskaSluzbaService studentskaSluzbaService;

    BibliotekaService(StudentskaSluzbaRepository studentskaSluzbaRepository) {
        this.studentskaSluzbaRepository = studentskaSluzbaRepository;
    }

    @Override
    protected CrudRepository<Biblioteka, Long> getRepository() {
        return bibliotekaRepository;
    }

    @Override
    protected BibliotekaDTO convertToDTO(Biblioteka entity) {
        
    	List<BibliotekaKnjigaDTO> bibliotekaKnjigaDTO = entity.getKnjige() != null ? 
                entity.getKnjige().stream()
                    .map(kn -> {
                        KnjigaDTO knjigaDTO = null;
                        if (kn.getKnjiga() != null) {
                            knjigaDTO = new KnjigaDTO(kn.getKnjiga().getId(), kn.getKnjiga().getNaziv(), kn.getKnjiga().getISBN(), null, kn.getKnjiga().getVidljiv() );
                        }
                        return new BibliotekaKnjigaDTO(kn.getId(), null, knjigaDTO, kn.getVidljiv());
                    })
                    .collect(Collectors.toList()) :
                new ArrayList<>();
    	
    	return new BibliotekaDTO(
            entity.getId(),
            bibliotekaKnjigaDTO,
            new StudentskaSluzbaDTO(entity.getStudentskaSluzba().getId(),null,null,null,null,null,null,entity.getStudentskaSluzba().getVidljiv()),
            entity.getVidljiv()
        );
    }


    @Override
    protected Biblioteka convertToEntity(BibliotekaDTO dto) {
        Biblioteka biblioteka = new Biblioteka();
       
        biblioteka.setId(dto.getId());
        
        if (dto.getStudentskaSluzba() != null && dto.getStudentskaSluzba().getId() != null) {
            StudentskaSluzba studentskaSluzba = new StudentskaSluzba();
            studentskaSluzba.setId(dto.getStudentskaSluzba().getId());
            biblioteka.setStudentskaSluzba(studentskaSluzba);
        }
        biblioteka.setVidljiv(dto.getVidljiv());

        return biblioteka;
    }

    @Override
    protected void updateEntityFromDto(BibliotekaDTO dto, Biblioteka entity) {
    	entity.getKnjige().clear();
    	
    	if (dto.getStudentskaSluzba() != null && dto.getStudentskaSluzba().getId() != null) {
            studentskaSluzbaRepository.findById(dto.getStudentskaSluzba().getId())
                .ifPresent(entity::setStudentskaSluzba);
        }
    	
    	entity.setVidljiv(dto.getVidljiv());
    	
    	List<BibliotekaKnjiga> updatedLinksD = new ArrayList<>();
        if (dto.getKnjige() != null) {
            for (BibliotekaKnjigaDTO dnDTO : dto.getKnjige()) {
                if (dnDTO.getKnjiga() != null && dnDTO.getKnjiga().getId() != null) {
                    Optional<Knjiga> optDepartman = knjigaRespository.findById(dnDTO.getKnjiga().getId());
                    if (optDepartman.isPresent()) {
                        BibliotekaKnjiga dn = new BibliotekaKnjiga();
                        dn.setBiblioteka(entity);;
                        dn.setKnjiga(optDepartman.get());
                        dn.setVidljiv(dnDTO.getVidljiv() != null ? dnDTO.getVidljiv() : true);
                        updatedLinksD.add(dn);
                    }
                }
            }
        }
        
        entity.getKnjige().addAll(updatedLinksD);

}
}
