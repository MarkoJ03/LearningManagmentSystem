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
    private KalendarService kalendarService;

    @Autowired
    @Lazy
    private PredmetService predmetService;
    @Autowired
    @Lazy
    private IshodEvaluacijeService ishodEvaluacijeService;

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
            entity.getKalendar() != null ? kalendarService.convertToDTO(entity.getKalendar()) : null,  
            predmetService.convertToDTO(entity.getPredmet()),
            new NastavnikDTO(entity.getNastavnik().getId(),null,entity.getNastavnik().getPrezime(),entity.getNastavnik().getIme(),null,null,null,null,null,null,null,null,null),
            new TipEvaluacijeDTO(entity.getTipEvaluacije().getId(),entity.getTipEvaluacije().getNaziv(),null,null),
            null,
            entity.getVidljiv()
        );
    }

    @Override
    protected EvaluacijaZnanja convertToEntity(EvaluacijaZnanjaDTO dto) {
        var entity = new EvaluacijaZnanja();
        entity.setId(dto.getId());
        entity.setVremePocetka(dto.getVremePocetka());
        entity.setVremeZavrsetka(dto.getVremeZavrsetka());
        entity.setKalendar(dto.getKalendar() != null && dto.getKalendar().getId() != null ? kalendarService.getById(dto.getKalendar().getId()) : null);
        entity.setPredmet(dto.getPredmet() != null && dto.getPredmet().getId() != null ? predmetService.getById(dto.getPredmet().getId()) : null);
        entity.setNastavnik(dto.getNastavnik() != null && dto.getNastavnik().getId() != null ? new Nastavnik(dto.getNastavnik().getId(), null, dto.getNastavnik().getPrezime(), dto.getNastavnik().getIme(), null, null, null, null, null, null, null, null, null) : null);
        entity.setTipEvaluacije(dto.getTipEvaluacije() != null && dto.getTipEvaluacije().getId() != null ? new TipEvaluacije(dto.getTipEvaluacije().getId(), dto.getTipEvaluacije().getNaziv(), null, null) : null);
        entity.setVidljiv(dto.getVidljiv());
        
        return entity;
    }

	@Override
	protected void updateEntityFromDto(EvaluacijaZnanjaDTO dto, EvaluacijaZnanja entity) {
		// TODO Auto-generated method stub
		
	}
    }
