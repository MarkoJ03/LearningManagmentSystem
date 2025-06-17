package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import server.DTOs.EvaluacijaZnanjaDTO;
import server.DTOs.KalendarDTO;
import server.model.EvaluacijaZnanja;
import server.model.Kalendar;
import server.model.Nastavnik;
import server.model.Predmet;
import server.model.TipEvaluacije;
import server.DTOs.NastavnikDTO;
import server.DTOs.PredmetDTO;
import server.DTOs.TipEvaluacijeDTO;
import server.DTOs.UniverzitetDTO;
import server.repository.EvaluacijaZnanjaRepository;
import server.repository.KalendarRepository;
import server.repository.NastavnikRepository;
import server.repository.PredmetRepository;
import server.repository.TipEvaluacijeRepository;

@Service
public class EvaluacijaZnanjaService extends BaseService<EvaluacijaZnanja, EvaluacijaZnanjaDTO, Long> {

	@Autowired
	private EvaluacijaZnanjaRepository evaluacijaZnanjaRepository;
	@Autowired
	@Lazy
	private KalendarService kalendarService;
	@Autowired
	@Lazy
	private NastavnikService nastavnikService;
	@Autowired
	@Lazy
	private PredmetService predmetService;
	@Autowired
	@Lazy
	private IshodEvaluacijeService ishodEvaluacijeService;

	@Autowired
	private KalendarRepository kalendarRepository;

	@Autowired
	private PredmetRepository predmetRepository;

	@Autowired
	private NastavnikRepository nastavnikRepository;

	@Autowired
	private TipEvaluacijeRepository tipEvaluacijeRepository;

	@Override
	protected CrudRepository<EvaluacijaZnanja, Long> getRepository() {
		return evaluacijaZnanjaRepository;
	}

	@Override
	protected EvaluacijaZnanjaDTO convertToDTO(EvaluacijaZnanja entity) {
		NastavnikDTO nastavnikDTO = null;
        if (entity.getNastavnik() != null) {
            nastavnikDTO = new NastavnikDTO(entity.getNastavnik().getId(), entity.getNastavnik().getIme(),
                    entity.getNastavnik().getPrezime(), entity.getNastavnik().getJmbg(), null, null, null,
                    null, null, null, entity.getNastavnik().getVidljiv());
        }
		
		return new EvaluacijaZnanjaDTO(entity.getId(), entity.getVremePocetka(), entity.getVremeZavrsetka(),
				new KalendarDTO(entity.getKalendar().getId(),null,null,null,null, entity.getKalendar().getVidljiv()),
				new PredmetDTO(entity.getPredmet().getId(), entity.getPredmet().getNaziv(), null,null,null,null
						,null,null,null,null,null,null,null,null,null, entity.getPredmet().getVidljiv()),
				nastavnikDTO,
				new TipEvaluacijeDTO(entity.getTipEvaluacije().getId(), entity.getTipEvaluacije().getNaziv(), null, entity.getTipEvaluacije().getVidljiv()),
				null, entity.getVidljiv());
	}

	@Override
	protected EvaluacijaZnanja convertToEntity(EvaluacijaZnanjaDTO dto) {
		var entity = new EvaluacijaZnanja();
		entity.setId(dto.getId());
		entity.setVremePocetka(dto.getVremePocetka());
		entity.setVremeZavrsetka(dto.getVremeZavrsetka());
		
		Kalendar kalendar = null;
		if (dto.getKalendar() != null && dto.getKalendar().getId() != null) {
			kalendar = kalendarRepository.findById(dto.getKalendar().getId())
				.orElseThrow(() -> new RuntimeException("Kalendar sa ID " + dto.getKalendar().getId() + " ne postoji."));
		}
		entity.setKalendar(kalendar);

		Predmet predmet = null;
		if (dto.getPredmet() != null && dto.getPredmet().getId() != null) {
			predmet = predmetRepository.findById(dto.getPredmet().getId())
				.orElseThrow(() -> new RuntimeException("Predmet sa ID " + dto.getPredmet().getId() + " ne postoji."));
		}
		entity.setPredmet(predmet);

		Nastavnik nastavnik = null;
		if (dto.getNastavnik() != null && dto.getNastavnik().getId() != null) {
			nastavnik = nastavnikRepository.findById(dto.getNastavnik().getId())
				.orElseThrow(() -> new RuntimeException("Nastavnik sa ID " + dto.getNastavnik().getId() + " ne postoji."));
		}
		entity.setNastavnik(nastavnik);

		TipEvaluacije tipEvaluacije = null;
		if (dto.getTipEvaluacije() != null && dto.getTipEvaluacije().getId() != null) {
			tipEvaluacije = tipEvaluacijeRepository.findById(dto.getTipEvaluacije().getId())
				.orElseThrow(() -> new RuntimeException("TipEvaluacije sa ID " + dto.getTipEvaluacije().getId() + " ne postoji."));
		}
		entity.setTipEvaluacije(tipEvaluacije);

		entity.setVidljiv(dto.getVidljiv());

		return entity;
	}

	@Override
	protected void updateEntityFromDto(EvaluacijaZnanjaDTO dto, EvaluacijaZnanja entity) {
		entity.setVremePocetka(dto.getVremePocetka());
		entity.setVremeZavrsetka(dto.getVremeZavrsetka());

		if (dto.getKalendar() != null && dto.getKalendar().getId() != null) {
			Kalendar kalendar = kalendarRepository.findById(dto.getKalendar().getId())
					.orElseThrow(() -> new RuntimeException("Kalendar not found"));
			entity.setKalendar(kalendar);
		} else {
            throw new IllegalArgumentException("Kalendar must be provided for EvaluacijaZnanja.");
        }

		if (dto.getPredmet() != null && dto.getPredmet().getId() != null) {
			Predmet predmet = predmetRepository.findById(dto.getPredmet().getId())
					.orElseThrow(() -> new RuntimeException("Predmet not found"));
			entity.setPredmet(predmet);
		} else {
            throw new IllegalArgumentException("Predmet must be provided for EvaluacijaZnanja.");
        }

		if (dto.getNastavnik() != null && dto.getNastavnik().getId() != null) {
			Nastavnik nastavnik = nastavnikRepository.findById(dto.getNastavnik().getId())
					.orElseThrow(() -> new RuntimeException("Nastavnik not found"));
			entity.setNastavnik(nastavnik);
		} else {
             throw new IllegalArgumentException("Nastavnik must be provided for EvaluacijaZnanja.");
        }

		if (dto.getTipEvaluacije() != null && dto.getTipEvaluacije().getId() != null) {
			TipEvaluacije tipEvaluacije = tipEvaluacijeRepository.findById(dto.getTipEvaluacije().getId())
					.orElseThrow(() -> new RuntimeException("Tip evaluacije not found"));
			entity.setTipEvaluacije(tipEvaluacije);
		} else {
            throw new IllegalArgumentException("Tip Evaluacije must be provided for EvaluacijaZnanja.");
        }

		entity.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true);
	}
}
