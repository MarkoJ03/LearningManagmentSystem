package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.GrupaStudenataDTO;
import server.model.GrupaStudenata;
import server.repository.GrupaStudenataRepository;

@Service
public class GrupaStudenataService extends BaseService<GrupaStudenata, GrupaStudenataDTO, Long> {

    @Autowired
    private GrupaStudenataRepository grupaStudenataRepository;

    @Override
    protected CrudRepository<GrupaStudenata, Long> getRepository() {
        return grupaStudenataRepository;
    }

    @Override
    protected GrupaStudenataDTO convertToDTO(GrupaStudenata entity) {
        return null;
    }

    @Override
    protected GrupaStudenata convertToEntity(GrupaStudenataDTO dto) {
        return null;
    }
}
