package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.ObjavaDTO;
import server.DTOs.StudentskaSluzbaDTO;
import server.model.Objava;
import server.model.StudentskaSluzba;
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

    	StudentskaSluzba sluzba = null;
    	
        return new ObjavaDTO(
        		entity.getId(),
        		entity.getNaslov(),
        		entity.getSadrzaj(),
        		sluzba,
        		entity.getVidljiv()
            );
    }

    @Override
    protected Objava convertToEntity(ObjavaDTO dto) {
    	
    	StudentskaSluzba sluzba = null;
        return new Objava(
        		dto.getId(),
        		dto.getNaslov(),
        		dto.getSadrzaj(),
        		sluzba,
        		dto.getVidljiv()
            );
    }

}
