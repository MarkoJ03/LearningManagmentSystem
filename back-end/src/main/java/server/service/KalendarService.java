package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.KalendarDTO;
import server.model.Kalendar;
import server.repository.KalendarRespository;

@Service
public class KalendarService extends BaseService<Kalendar, KalendarDTO, Long> {

    @Autowired
    private KalendarRespository kalendarRepository;

    @Override
    protected CrudRepository<Kalendar, Long> getRepository() {
        return kalendarRepository;
    }

    @Override
    protected KalendarDTO convertToDTO(Kalendar entity) {
       
        return null;
    }

    @Override
    protected Kalendar convertToEntity(KalendarDTO dto) {
        
        return null;
    }
}
