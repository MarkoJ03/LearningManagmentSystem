package server.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import server.model.GodinaStudija;

@Repository
public interface GodinaStudijaRepository extends CrudRepository<GodinaStudija, Long> {
	List<GodinaStudija> findByStudijskiProgramIdAndVidljivTrue(Long programId);
}
