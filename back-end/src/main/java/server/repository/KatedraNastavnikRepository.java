package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.KatedraNastavnik;

@Repository
public interface KatedraNastavnikRepository extends CrudRepository<KatedraNastavnik, Long>, PagingAndSortingRepository<KatedraNastavnik, Long> {

}
