package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import server.model.Objava;

public interface ObjavaRepository extends CrudRepository<Objava, Long>, PagingAndSortingRepository<Objava, Long>{

}
