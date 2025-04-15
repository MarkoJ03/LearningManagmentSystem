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
        // TODO: Implement mapping from entity to DTO
        return null;
    }

    @Override
    protected Knjiga convertToEntity(KnjigaDTO dto) {
        // TODO: Implement mapping from DTO to entity
        return null;
    }
}
