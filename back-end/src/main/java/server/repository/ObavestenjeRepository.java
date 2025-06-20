package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.Obavestenje;

@Repository
public interface ObavestenjeRepository extends CrudRepository<Obavestenje, Long>, PagingAndSortingRepository<Obavestenje, Long>{

}
