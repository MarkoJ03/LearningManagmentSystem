package server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.Entity;
import server.DTOs.BibliotekaDTO;
import server.DTOs.BibliotekaKnjigaDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.model.Biblioteka;
import server.model.BibliotekaKnjiga;
import server.model.StudentNaGodini;
import server.repository.BibliotekaRepository;

@Service
public class BibliotekaService extends BaseService<Biblioteka, BibliotekaDTO, Long> {

    @Autowired
    private BibliotekaRepository bibliotekaRepository;
    
    @Autowired
    @Lazy
    private BibliotekaKnjigaService bkService;
    
    @Autowired
    @Lazy
    private KnjigaService knjigaService;

    @Autowired
    @Lazy
    private StudentskaSluzbaService studentskaSluzbaService;

    @Override
    protected CrudRepository<Biblioteka, Long> getRepository() {
        return bibliotekaRepository;
    }

    @Override
    protected BibliotekaDTO convertToDTO(Biblioteka entity) {
        return new BibliotekaDTO(
            entity.getId(),
//            entity.getStudentskaSluzba() != null ? studentskaSluzbaService.convertToDTO(entity.getStudentskaSluzba()) : null,
            null,
            entity.getBibliotekaKnjiga() != null ? entity.getBibliotekaKnjiga().stream()
            		.map(bk -> new BibliotekaKnjigaDTO(
            			    bk.getId(),
            			    null, 
            			    knjigaService.convertToDTO(bk.getKnjiga()),
            			    bk.getVidljiv()
            			))                .toList()
                : null,
            entity.getVidljiv()
        );
    }


    @Override
    protected Biblioteka convertToEntity(BibliotekaDTO dto) {
        Biblioteka biblioteka = new Biblioteka();
        biblioteka.setId(dto.getId());
//        biblioteka.setStudentskaSluzba(studentskaSluzbaService.convertToEntity(dto.getStudentskaSluzba()));
        biblioteka.setStudentskaSluzba(null);
        biblioteka.setVidljiv(dto.getVidljiv());

        if (dto.getBibliotekaKnjiga() != null) {
            List<BibliotekaKnjiga> veze = dto.getBibliotekaKnjiga().stream()
                .map(bkDto -> {
                    BibliotekaKnjiga veza = new BibliotekaKnjiga();
                    veza.setBiblioteka(biblioteka);
                    veza.setKnjiga(knjigaService.convertToEntity(bkDto.getKnjiga()));
                    veza.setVidljiv(bkDto.getVidljiv());
                    return veza;
                }).toList();
            biblioteka.setBibliotekaKnjiga(veze);
        }

        return biblioteka;
    }

}
