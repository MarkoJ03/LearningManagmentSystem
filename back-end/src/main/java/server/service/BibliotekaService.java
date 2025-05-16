package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import server.DTOs.BibliotekaDTO;
import server.model.Biblioteka;
import server.repository.BibliotekaRepository;

@Service
public class BibliotekaService extends BaseService<Biblioteka, BibliotekaDTO, Long> {

    @Autowired
    private BibliotekaRepository bibliotekaRepository;

    @Override
    protected CrudRepository<Biblioteka, Long> getRepository() {
        return bibliotekaRepository;
    }

    @Override
    protected BibliotekaDTO convertToDTO(Biblioteka entity) {
        return new BibliotekaDTO(
            entity.getId(),
            null,
            null,
            entity.getVidljiv()
        );
    }

    @Override
    protected Biblioteka convertToEntity(BibliotekaDTO dto) {
        return new Biblioteka(
            dto.getId(),
            null,
            null,
            dto.getVidljiv()
        );
    }
}
