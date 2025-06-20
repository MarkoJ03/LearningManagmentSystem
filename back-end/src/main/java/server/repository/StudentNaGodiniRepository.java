package server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import server.model.StudentNaGodini;

@Repository
public interface StudentNaGodiniRepository extends CrudRepository<StudentNaGodini, Long>, PagingAndSortingRepository<StudentNaGodini, Long> {

	@Query("SELECT sng FROM StudentNaGodini sng " +
	           "WHERE sng.grupaStudenata.id IN :grupaIds AND sng.vidljiv = true")
	    List<StudentNaGodini> findByGrupaStudenataIds(@Param("grupaIds") List<Long> grupaIds);
}
