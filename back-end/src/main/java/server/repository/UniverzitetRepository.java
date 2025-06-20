package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.Univerzitet;

@Repository
public interface UniverzitetRepository extends CrudRepository<Univerzitet, Long>, PagingAndSortingRepository<Univerzitet, Long> {

}
