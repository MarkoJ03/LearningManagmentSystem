package server.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import server.DTOs.InventarDTO;
import server.DTOs.StudentskaSluzbaDTO;
import server.model.Inventar;
import server.model.StudentskaSluzba;
import server.repository.InventarRepository;
import server.repository.StudentskaSluzbaRepository;

@Service
public class InventarService extends BaseService<Inventar, InventarDTO, Long> {

	 @Autowired
	    private InventarRepository inventarRepository;
	 
	 @Autowired
	    private StudentskaSluzbaRepository studentskaSluzbaRepository;

	    @Override
	    protected CrudRepository<Inventar, Long> getRepository() {
	        return inventarRepository;
	    }

	    @Override
	    protected InventarDTO convertToDTO(Inventar entity) {
	        return new InventarDTO(
	            entity.getId(),
	            entity.getStudentskaSluzba() != null ? 
	                new StudentskaSluzbaDTO(
	                    entity.getStudentskaSluzba().getId(),
	                    entity.getStudentskaSluzba().getVidljiv()
	                ) : null,
	            entity.getVidljiv()
	        );
	    }

	    @Override
	    protected Inventar convertToEntity(InventarDTO dto) {
	        return new Inventar(
	            dto.getId(),
	            dto.getStudentskaSluzba() != null ? 
	                new StudentskaSluzba(
	                    dto.getStudentskaSluzba().getId(),
	                    dto.getStudentskaSluzba().getVidljiv()
	                ) : null,
	            dto.getVidljiv()
	        );
	    }

	    @Override
	    protected void updateEntityFromDto(InventarDTO dto, Inventar entity) {
	       
	        if (dto.getVidljiv() != null) {
	            entity.setVidljiv(dto.getVidljiv());
	        }

	        
	        if (dto.getStudentskaSluzba() != null && dto.getStudentskaSluzba().getId() != null) {
	           
	            Optional<StudentskaSluzba> optionalStudentskaSluzba = studentskaSluzbaRepository.findById(dto.getStudentskaSluzba().getId());
	            if (optionalStudentskaSluzba.isPresent()) {
	                entity.setStudentskaSluzba(optionalStudentskaSluzba.get());
	            } else {
	               
	                entity.setStudentskaSluzba(null);
	                
	            }
	        } else {
	            
	            entity.setStudentskaSluzba(null);
	        }

	        
	    }

}
