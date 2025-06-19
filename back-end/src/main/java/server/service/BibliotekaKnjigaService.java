package server.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.BibliotekaDTO;
import server.DTOs.BibliotekaKnjigaDTO;
import server.model.BibliotekaKnjiga;
import server.DTOs.KnjigaDTO;
import server.model.Biblioteka;
import server.model.BibliotekaKnjiga;
import server.model.Knjiga;
import server.repository.BibliotekaKnjigaRepository;

@Service
public class BibliotekaKnjigaService extends BaseService<BibliotekaKnjiga, BibliotekaKnjigaDTO, Long> {

    @Autowired
    private BibliotekaKnjigaRepository bibliotekaKnjigaRepository;

    
    @Autowired
    @Lazy
    private BibliotekaService bService;
    
    @Autowired
    @Lazy
    private KnjigaService kService;
    
    
    
    @Override
    protected CrudRepository<BibliotekaKnjiga, Long> getRepository() {
        return bibliotekaKnjigaRepository;
    }

    @Override
    protected BibliotekaKnjigaDTO convertToDTO(BibliotekaKnjiga entity) {
    	

    	
        return new BibliotekaKnjigaDTO(
            entity.getId(),
            new BibliotekaDTO(entity.getBiblioteka().getId(), null,null,entity.getBiblioteka().getVidljiv()),
            new KnjigaDTO(entity.getKnjiga().getId(),null,null,null,entity.getKnjiga().getVidljiv()),
            entity.getVidljiv()
        );
    }

    @Override
    protected BibliotekaKnjiga convertToEntity(BibliotekaKnjigaDTO dto) {
        return new BibliotekaKnjiga(
            dto.getId(),
            new Biblioteka(dto.getBiblioteka().getId(), null,null,dto.getBiblioteka().getVidljiv()),
            new Knjiga(dto.getKnjiga().getId(),null,null,null,dto.getKnjiga().getVidljiv()),
            dto.getVidljiv()
        );
    }
    
	public List<BibliotekaKnjigaDTO> findByBibliotekaId(Long bibliotekaId) {
	    return bibliotekaKnjigaRepository.findByBibliotekaIdAndVidljivTrue(bibliotekaId)
	            .stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	}

	@Override
	protected void updateEntityFromDto(BibliotekaKnjigaDTO dto, BibliotekaKnjiga entity) {
		// TODO Auto-generated method stub
		
	}
}
