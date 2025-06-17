package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.StudentskaSluzbaDTO;
import server.model.StudentskaSluzba;
import server.repository.StudentskaSluzbaRepository;

@Service
public class StudentskaSluzbaService extends BaseService<StudentskaSluzba, StudentskaSluzbaDTO, Long> {

    @Autowired
    private StudentskaSluzbaRepository studentskaSluzbaRepository;

    @Override
    protected CrudRepository<StudentskaSluzba, Long> getRepository() {
        return studentskaSluzbaRepository;
    }

    @Override
    protected StudentskaSluzbaDTO convertToDTO(StudentskaSluzba entity) {
        return new StudentskaSluzbaDTO(
            entity.getId(),
            null,  
            null,  
            null,  
            null,  
            null,  
            null,
            null,
            entity.getVidljiv()
        );
    }

    @Override
    protected StudentskaSluzba convertToEntity(StudentskaSluzbaDTO dto) {
        return new StudentskaSluzba(
            dto.getId(),
            null,  
            null,  
            null,  
            null,  
            null,  
            null,  
            null,
            dto.getVidljiv()
        );
    }

	@Override
	protected void updateEntityFromDto(StudentskaSluzbaDTO dto, StudentskaSluzba entity) {
		// TODO Auto-generated method stub
		
	}
}

