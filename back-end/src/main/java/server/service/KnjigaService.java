package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import server.DTOs.KnjigaDTO;
import server.model.Knjiga;
import server.repository.KnjigaRepository;


@Service
public class KnjigaService extends BaseService<Knjiga, KnjigaDTO, Long> {

    @Autowired
    private KnjigaRepository knjigaRepository;

    @Override
    protected CrudRepository<Knjiga, Long> getRepository() {
        return knjigaRepository;
    }

    @Override
    protected KnjigaDTO convertToDTO(Knjiga entity) {
        return new KnjigaDTO(
                entity.getId(),
                entity.getNaziv(),
                entity.getISBN(),
                null,  
                entity.getVidljiv()
        );
    }

    @Override
    protected Knjiga convertToEntity(KnjigaDTO dto) {
        return new Knjiga(
                dto.getId(),
                dto.getNaziv(),
                dto.getISBN(),
                null,  
                dto.getVidljiv()
        );
    }
}
