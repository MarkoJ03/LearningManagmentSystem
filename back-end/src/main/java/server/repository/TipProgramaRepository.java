package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.TipPrograma;

@Repository
public interface TipProgramaRepository extends CrudRepository<TipPrograma, Long>, PagingAndSortingRepository<TipPrograma, Long>{

}
