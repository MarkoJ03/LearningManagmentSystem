package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.Fakultet;

@Repository
public interface FakultetRepository extends CrudRepository<Fakultet, Long>, PagingAndSortingRepository<Fakultet, Long> {

}
