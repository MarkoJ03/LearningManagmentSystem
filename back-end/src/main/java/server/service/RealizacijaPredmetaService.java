package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.IshodPredmetaDTO;
import server.DTOs.NastavnikDTO;
import server.DTOs.PredmetDTO;
import server.DTOs.RealizacijaPredmetaDTO;
import server.DTOs.TerminNastaveDTO;
import server.DTOs.TipNastaveDTO;
import server.model.IshodPredmeta;
import server.model.Nastavnik;
import server.model.Predmet;
import server.model.RealizacijaPredmeta;
import server.model.TerminNastave;
import server.model.TipNastave;
import server.repository.RealizacijaPredmetaRepository;

@Service
public class RealizacijaPredmetaService extends BaseService<RealizacijaPredmeta, RealizacijaPredmetaDTO, Long> {

	@Autowired
	private RealizacijaPredmetaRepository realizacijaPredmetaRepository;

	@Autowired
	@Lazy
	private TerminNastaveService terminNastaveService;

	@Autowired
	@Lazy
	private IshodPredmetaService ishodPredmetaService;

	@Override
	protected CrudRepository<RealizacijaPredmeta, Long> getRepository() {
		return realizacijaPredmetaRepository;
	}

	@Override
	protected RealizacijaPredmetaDTO convertToDTO(RealizacijaPredmeta entity) {
		NastavnikDTO nastavnik = new NastavnikDTO(entity.getNastavnik().getId(),null, entity.getNastavnik().getIme(),
				entity.getNastavnik().getPrezime(), entity.getNastavnik().getJmbg(), null, null, null, null, null,null,null, entity.getNastavnik().getVidljiv());
		TipNastaveDTO tipNastave = new TipNastaveDTO(entity.getTipNastave().getId(), entity.getTipNastave().getNaziv(),
				null, entity.getTipNastave().getVidljiv());
		PredmetDTO predmet = new PredmetDTO(entity.getPredmet().getId(), entity.getPredmet().getEsbp(),
				entity.getPredmet().getObavezan(), entity.getPredmet().getBrojPredavanja(), entity.getPredmet().getBrojVezbi(),
				entity.getPredmet().getIstrazivackiRad(), entity.getPredmet().getBrojSemestara(), entity.getPredmet().getOpis(),
				entity.getPredmet().getCilj(), null, null,null,null, entity.getPredmet().getVidljiv());

		ArrayList<TerminNastaveDTO> terminiNastave = new ArrayList<>();
		for(TerminNastave tn : entity.getTerminiNastave()) {
			TerminNastaveDTO tnDTO = terminNastaveService.convertToDTO(tn);
			terminiNastave.add(tnDTO);
		}

		IshodPredmetaDTO ip = ishodPredmetaService.convertToDTO(entity.getIshodPredmeta());

		return new RealizacijaPredmetaDTO(entity.getId(), nastavnik, tipNastave, predmet, terminiNastave, ip, entity.getVidljiv());
	}

	@Override
	protected RealizacijaPredmeta convertToEntity(RealizacijaPredmetaDTO dto) {
		Nastavnik nastavnik = new Nastavnik(dto.getNastavnik().getId(), null, dto.getNastavnik().getIme(),
				dto.getNastavnik().getPrezime(), dto.getNastavnik().getJmbg(), null, null, null, null,null,null,null, dto.getNastavnik().getVidljiv());
		TipNastave tipNastave = new TipNastave(dto.getTipNastave().getId(), dto.getTipNastave().getNaziv(),
				null, dto.getTipNastave().getVidljiv());
		Predmet predmet = new Predmet(dto.getPredmet().getId(), dto.getPredmet().getEsbp(),
				dto.getPredmet().getObavezan(), dto.getPredmet().getBrojPredavanja(), dto.getPredmet().getBrojVezbi(),
				dto.getPredmet().getIstrazivackiRad(), dto.getPredmet().getBrojSemestara(), dto.getPredmet().getOpis(),
				dto.getPredmet().getCilj(), null, null,null,null,dto.getPredmet().getVidljiv());

		ArrayList<TerminNastave> terminiNastave = new ArrayList<>();
		for(TerminNastaveDTO tnDTO : dto.getTerminiNastave()) {
			TerminNastave tn = terminNastaveService.convertToEntity(tnDTO);
			terminiNastave.add(tn);
		}

		IshodPredmeta ip = ishodPredmetaService.convertToEntity(dto.getIshodPredmeta());

		return new RealizacijaPredmeta(dto.getId(), nastavnik, tipNastave, predmet, terminiNastave, ip, dto.getVidljiv());
	}

}
