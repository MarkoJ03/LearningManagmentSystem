package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.ObjavaDTO;
import server.model.Objava;
import server.repository.ObjavaRepository;

@Service
public class ObjavaService extends BaseService<Objava, ObjavaDTO, Long> {

    @Autowired
    private ObjavaRepository objavaRepository;

    @Override
    protected CrudRepository<Objava, Long> getRepository() {
        return objavaRepository;
    }

    @Override
    protected ObjavaDTO convertToDTO(Objava entity) {
        
        return null;
    }

    @Override
    protected Objava convertToEntity(ObjavaDTO dto) {
        
        return null;
    }
}
