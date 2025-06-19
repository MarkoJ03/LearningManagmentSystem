package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.NastavnikDTO;
import server.DTOs.ObavestenjeDTO;
import server.DTOs.PredmetDTO;
import server.model.Nastavnik;
import server.model.Obavestenje;
import server.model.Predmet;
import server.repository.NastavnikRepository;
import server.repository.ObavestenjeRepository;
import server.repository.PredmetRepository;

@Service
public class ObavestenjeService extends BaseService<Obavestenje, ObavestenjeDTO, Long> {

	@Autowired
	private ObavestenjeRepository obavestenjeRepository;
	@Autowired
	private NastavnikRepository nastavnikRepository;
	@Autowired
	private PredmetRepository predmetRepository;

	@Override
	protected CrudRepository<Obavestenje, Long> getRepository() {
		return obavestenjeRepository;
	}

	@Override
	protected ObavestenjeDTO convertToDTO(Obavestenje entity) {

		NastavnikDTO nastavnik = new NastavnikDTO(entity.getNastavnik().getId(), null, entity.getNastavnik().getIme(),
				entity.getNastavnik().getPrezime(), entity.getNastavnik().getJmbg(), null,null, null, null, null,
				null, entity.getNastavnik().getVidljiv());

		PredmetDTO predmet = new PredmetDTO(entity.getPredmet().getId(), entity.getPredmet().getNaziv(), null, null,
				null, null, null, null, null, null, null, null, null, null, null, null);

		return new ObavestenjeDTO(entity.getId(), entity.getNaslov(), entity.getSadrzaj(), nastavnik, predmet,
				entity.getVidljiv());

	}

	@Override
	protected Obavestenje convertToEntity(ObavestenjeDTO dto) {
		Nastavnik nastavnik = new Nastavnik(dto.getNastavnik().getId(), null, dto.getNastavnik().getIme(),
				dto.getNastavnik().getPrezime(), dto.getNastavnik().getJmbg(), null, null,null, null, null, null,
				dto.getNastavnik().getVidljiv());

		Predmet predmet = new Predmet(dto.getPredmet().getId(), dto.getPredmet().getNaziv(), null, null, null, null,
				null, null, null, null, null, null, null, null, null, null);

		return new Obavestenje(dto.getId(), dto.getNaslov(), dto.getSadrzaj(), nastavnik, predmet, dto.getVidljiv());

	}

	@Override
	protected void updateEntityFromDto(ObavestenjeDTO dto, Obavestenje entity) {

		if (dto.getNaslov() != null) {
			entity.setNaslov(dto.getNaslov());
		}
		if (dto.getSadrzaj() != null) {
			entity.setSadrzaj(dto.getSadrzaj());
		}
		if (dto.getVidljiv() != null) {
			entity.setVidljiv(dto.getVidljiv());
		}

		if (dto.getNastavnik() != null && dto.getNastavnik().getId() != null) {
			Nastavnik nastavnik = nastavnikRepository.findById(dto.getNastavnik().getId())
					.orElseThrow(() -> new RuntimeException("Nastavnik sa ID " + dto.getNastavnik().getId() + " ne postoji."));
			entity.setNastavnik(nastavnik);
		} else if (dto.getNastavnik() != null && dto.getNastavnik().getId() == null) {
            entity.setNastavnik(null);
        }

		if (dto.getPredmet() != null && dto.getPredmet().getId() != null) {
			Predmet predmet = predmetRepository.findById(dto.getPredmet().getId())
					.orElseThrow(() -> new RuntimeException("Predmet sa ID " + dto.getPredmet().getId() + " ne postoji."));
			entity.setPredmet(predmet);
		} else if (dto.getPredmet() != null && dto.getPredmet().getId() == null) {
            entity.setPredmet(null);
        }
	}
}
