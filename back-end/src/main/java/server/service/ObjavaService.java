package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.ObjavaDTO;
import server.DTOs.StudentskaSluzbaDTO;
import server.model.Objava;
import server.model.StudentskaSluzba;
import server.repository.ObjavaRepository;
import server.repository.StudentskaSluzbaRepository;

@Service
public class ObjavaService extends BaseService<Objava, ObjavaDTO, Long> {

    private final StudentskaSluzbaRepository studentskaSluzbaRepository;

    @Autowired
    private ObjavaRepository objavaRepository;

    ObjavaService(StudentskaSluzbaRepository studentskaSluzbaRepository) {
        this.studentskaSluzbaRepository = studentskaSluzbaRepository;
    }

    @Override
    protected CrudRepository<Objava, Long> getRepository() {
        return objavaRepository;
    }

    @Override
    protected ObjavaDTO convertToDTO(Objava entity) {
    	
    	StudentskaSluzbaDTO sluzba = null;
    	
    	if (entity.getStudentskaSluzba() != null) {
    	 sluzba = new StudentskaSluzbaDTO(entity.getStudentskaSluzba().getId(), null,null,null,null,null,null,entity.getStudentskaSluzba().getVidljiv());
    	}
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
    	
    	Objava objava = new Objava();
    	
    	objava.setNaslov(dto.getNaslov());
		objava.setSadrzaj(dto.getSadrzaj());
    	objava.setVidljiv(dto.getVidljiv());
		
		
    	if (dto.getStudentskaSluzba() != null && dto.getStudentskaSluzba().getId() != null) {
    		
    		StudentskaSluzba sluzba = new StudentskaSluzba();
    		sluzba.setId(dto.getStudentskaSluzba().getId());
    		objava.setStudentskaSluzba(sluzba);
    		
    		
    		
    	
    	}
		return objava;
    	
    	
    }

    @Override
	protected void updateEntityFromDto(ObjavaDTO dto, Objava entity) {
		
		entity.setNaslov(dto.getNaslov());
		entity.setSadrzaj(dto.getSadrzaj());
		entity.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : entity.getVidljiv()); 

		
		if (dto.getStudentskaSluzba() != null && dto.getStudentskaSluzba().getId() != null) {
			
			studentskaSluzbaRepository.findById(dto.getStudentskaSluzba().getId())
					.ifPresent(entity::setStudentskaSluzba);
		} else {
			
			entity.setStudentskaSluzba(null);
		}


		
	}

}
