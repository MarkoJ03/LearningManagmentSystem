package server.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import server.model.DepartmanNastavnik;

@Repository
public interface DepartmanNastavnikRepository extends CrudRepository<DepartmanNastavnik, Long>, PagingAndSortingRepository<DepartmanNastavnik, Long> {
	List<DepartmanNastavnik> findByDepartmanIdAndVidljivTrue(Long departmanId);



}
