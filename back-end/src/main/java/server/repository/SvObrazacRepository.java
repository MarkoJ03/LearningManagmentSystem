package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import server.model.SvObrazac;

public interface SvObrazacRepository extends CrudRepository<SvObrazac, Long>, PagingAndSortingRepository<SvObrazac, Long> {

}
