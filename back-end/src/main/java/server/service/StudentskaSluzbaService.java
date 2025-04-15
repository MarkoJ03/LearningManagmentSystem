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
        
        return null;
    }

    @Override
    protected StudentskaSluzba convertToEntity(StudentskaSluzbaDTO dto) {
        
        return null;
    }
}
