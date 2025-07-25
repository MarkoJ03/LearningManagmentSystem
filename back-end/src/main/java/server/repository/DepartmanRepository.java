package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.Departman;

@Repository
public interface DepartmanRepository extends CrudRepository<Departman, Long>, PagingAndSortingRepository<Departman, Long>{

}
