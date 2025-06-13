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
import server.repository.ObavestenjeRepository;

@Service
public class ObavestenjeService extends BaseService<Obavestenje, ObavestenjeDTO, Long>{

	@Autowired
	private ObavestenjeRepository obavestenjeRepository;
	
	@Autowired
	@Lazy
	private PredmetService pService;

	@Override
	protected CrudRepository<Obavestenje, Long> getRepository() {
		return obavestenjeRepository;
	}

	@Override
	protected ObavestenjeDTO convertToDTO(Obavestenje entity) {

		NastavnikDTO nastavnik = new NastavnikDTO(entity.getNastavnik().getId(),null, entity.getNastavnik().getIme(),
				entity.getNastavnik().getPrezime(), entity.getNastavnik().getJmbg(), null, null, null, null,null, null,null,entity.getNastavnik().getVidljiv());

		return new ObavestenjeDTO(entity.getId(), entity.getNaslov(), entity.getSadrzaj(), nastavnik,
				new PredmetDTO(entity.getPredmet().getId(),entity.getPredmet().getNaziv(),null,null,null,null,null,null,null,null,null,null,null,null,null,entity.getPredmet().getVidljiv()), entity.getVidljiv());

	}

	@Override
	protected Obavestenje convertToEntity(ObavestenjeDTO dto) {
		Nastavnik nastavnik = new Nastavnik(dto.getNastavnik().getId(), null, dto.getNastavnik().getIme(),

				dto.getNastavnik().getPrezime(), dto.getNastavnik().getJmbg(), null, null, null,null, null,null,null, dto.getNastavnik().getVidljiv());

		return new Obavestenje(dto.getId(), dto.getNaslov(), dto.getSadrzaj(), nastavnik,
				new Predmet(dto.getPredmet().getId(),dto.getPredmet().getNaziv(),null,null,null,null,null,null,null,null,null,null,null,null,null,dto.getPredmet().getVidljiv()), dto.getVidljiv());

	}

}
