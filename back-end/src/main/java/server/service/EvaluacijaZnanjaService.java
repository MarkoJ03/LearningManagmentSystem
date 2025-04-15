package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.EvaluacijaZnanjaDTO;
import server.model.EvaluacijaZnanja;
import server.repository.EvaluacijaZnanjaRepository;

@Service
public class EvaluacijaZnanjaService extends BaseService<EvaluacijaZnanja, EvaluacijaZnanjaDTO, Long> {

    @Autowired
    private EvaluacijaZnanjaRepository evaluacijaZnanjaRepository;

    @Override
    protected CrudRepository<EvaluacijaZnanja, Long> getRepository() {
        return evaluacijaZnanjaRepository;
    }

    @Override
    protected EvaluacijaZnanjaDTO convertToDTO(EvaluacijaZnanja entity) {
        return null;
    }

    @Override
    protected EvaluacijaZnanja convertToEntity(EvaluacijaZnanjaDTO dto) {
        return null;
    }
}
