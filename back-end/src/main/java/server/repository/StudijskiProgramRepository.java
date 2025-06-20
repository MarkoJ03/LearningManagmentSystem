package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.StudijskiProgram;

@Repository
public interface StudijskiProgramRepository extends CrudRepository<StudijskiProgram, Long>, PagingAndSortingRepository<StudijskiProgram, Long>{

}
