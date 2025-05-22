package server.service;

import java.util.ArrayList;

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
    private StudentskaSluzbaService sService;

    @Override
    protected CrudRepository<Biblioteka, Long> getRepository() {
        return bibliotekaRepository;
    }

    @Override
    protected BibliotekaDTO convertToDTO(Biblioteka entity) {
    	
//		ArrayList<BibliotekaKnjigaDTO> knjige = new ArrayList<>();
//		for (BibliotekaKnjiga s : entity.getBibliotekaKnjiga()) {
//			BibliotekaKnjigaDTO sDTO = new BibliotekaKnjigaDTO(s.getId(), null, null, s.getVidljiv());
//			knjige.add(sDTO);
//		}
    	
        return new BibliotekaDTO(
            entity.getId(),
//            knjige,
            sService.convertToDTO(entity.getStudentskaSluzba()),
            entity.getVidljiv()
        );
    }

    @Override
    protected Biblioteka convertToEntity(BibliotekaDTO dto) {
    	
//		ArrayList<BibliotekaKnjiga> knjige = new ArrayList<>();
//		for (BibliotekaKnjigaDTO s : dto.getBibliotekaKnjiga()) {
//			BibliotekaKnjiga sDTO = new BibliotekaKnjiga(s.getId(), null, null, s.getVidljiv());
//			knjige.add(sDTO);
//		}
    	
    	
        return new Biblioteka(
            dto.getId(),
//            knjige,
            sService.convertToEntity(dto.getStudentskaSluzba()),
            dto.getVidljiv()
        );
    }
}
