package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import server.model.Kalendar;

public interface KalendarRepository extends CrudRepository<Kalendar, Long>, PagingAndSortingRepository<Kalendar, Long>{

}
