package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.model.GrupaStudenataPredmet;

@Repository
public interface GrupaStudenataPredmetRepository extends JpaRepository<GrupaStudenataPredmet, Long> {
    
}