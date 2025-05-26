package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.PravoPristupa;

@Repository
public interface PravoPristupaRepository extends CrudRepository<PravoPristupa, Long>, PagingAndSortingRepository<PravoPristupa, Long>{

}
