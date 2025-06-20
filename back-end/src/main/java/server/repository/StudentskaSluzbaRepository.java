package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import server.model.StudentskaSluzba;

public interface StudentskaSluzbaRepository extends CrudRepository<StudentskaSluzba, Long>, PagingAndSortingRepository<StudentskaSluzba, Long> {

}
