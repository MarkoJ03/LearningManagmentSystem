package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import server.DTOs.EvaluacijaZnanjaDTO;
import server.model.EvaluacijaZnanja;
import server.model.Nastavnik;
import server.model.TipEvaluacije;
import server.DTOs.NastavnikDTO;
import server.DTOs.PredmetDTO;
import server.DTOs.TipEvaluacijeDTO;
import server.repository.EvaluacijaZnanjaRepository;

@Service
public class EvaluacijaZnanjaService extends BaseService<EvaluacijaZnanja, EvaluacijaZnanjaDTO, Long> {

    @Autowired
    private EvaluacijaZnanjaRepository evaluacijaZnanjaRepository;
    
    @Autowired
    @Lazy
    private PredmetService predmetService;

    @Override
    protected CrudRepository<EvaluacijaZnanja, Long> getRepository() {
        return evaluacijaZnanjaRepository;
    }

    @Override
    protected EvaluacijaZnanjaDTO convertToDTO(EvaluacijaZnanja entity) {
        return new EvaluacijaZnanjaDTO(
            entity.getId(),
            entity.getVremePocetka(),
            entity.getVremeZavrsetka(),
            null,
            predmetService.convertToDTO(entity.getPredmet()),
            new NastavnikDTO(entity.getNastavnik().getId(),null,entity.getNastavnik().getPrezime(),entity.getNastavnik().getIme(),null,null,null,null,null,null,null,null,null),
            new TipEvaluacijeDTO(entity.getTipEvaluacije().getId(),entity.getTipEvaluacije().getNaziv(),null,null),
            null,
            entity.getVidljiv()
        );
    }

    @Override
    protected EvaluacijaZnanja convertToEntity(EvaluacijaZnanjaDTO dto) {
        return new EvaluacijaZnanja(
            dto.getId(),
            dto.getVremePocetka(),
            dto.getVremeZavrsetka(),
            null,
            predmetService.convertToEntity(dto.getPredmet()),
            new Nastavnik(dto.getNastavnik().getId(),null,dto.getNastavnik().getPrezime(),dto.getNastavnik().getIme(),null,null,null,null,null,null,null,null,null),
            new TipEvaluacije(dto.getTipEvaluacije().getId(),dto.getTipEvaluacije().getNaziv(),null,null),
            null,
            dto.getVidljiv()
        );
    }
}
