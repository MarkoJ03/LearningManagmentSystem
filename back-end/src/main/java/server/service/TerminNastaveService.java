package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.KalendarDTO;
import server.DTOs.PredmetDTO;
import server.DTOs.RealizacijaPredmetaDTO;
import server.DTOs.TerminNastaveDTO;
import server.DTOs.TipNastaveDTO;
import server.model.Kalendar;
import server.model.Predmet;
import server.model.RealizacijaPredmeta;
import server.model.TerminNastave;
import server.model.TipNastave;
import server.repository.KalendarRepository;
import server.repository.RealizacijaPredmetaRepository;
import server.repository.TerminNastaveRepository;

@Service
public class TerminNastaveService extends BaseService<TerminNastave, TerminNastaveDTO, Long>{

	@Autowired
	private TerminNastaveRepository terminNastaveRepository;

	@Autowired
	private RealizacijaPredmetaRepository realizacijaPredmetaRepository;
	
	@Autowired
	private KalendarRepository kalendarRepository;
	
	@Override
	protected CrudRepository<TerminNastave, Long> getRepository() {
		return terminNastaveRepository;
	}

	@Override
	protected TerminNastaveDTO convertToDTO(TerminNastave entity) {
		//predmetDTO
		RealizacijaPredmetaDTO realizacijaPredmeta = new RealizacijaPredmetaDTO(entity.getRealizacijaPredmeta().getId(),
				null, null, null, null ,null, entity.getRealizacijaPredmeta().getVidljiv());
		
		KalendarDTO kalendar = new KalendarDTO(entity.getKalendar().getId(), null,null,null,null, entity.getKalendar().getVidljiv());

		return new TerminNastaveDTO(entity.getId(), entity.getVremePocetka(), entity.getVremeKraja(), entity.getBrojCasova(), realizacijaPredmeta, kalendar, entity.getVidljiv());

	}

	@Override
	protected TerminNastave convertToEntity(TerminNastaveDTO dto) {
		//Predmet predmet = new Predmet(dto.getRealizacijaPredmeta().getPredmet().getId(), dto.getRealizacijaPredmeta().getPredmet().getNaziv(), null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		
		RealizacijaPredmeta realizacijaPredmeta = new RealizacijaPredmeta(dto.getRealizacijaPredmeta().getId(),
				null, null, null, null ,null, dto.getRealizacijaPredmeta().getVidljiv());
		
		Kalendar kalendar = new Kalendar(dto.getKalendar().getId(), null,null,null,null, dto.getKalendar().getVidljiv());

		return new TerminNastave(dto.getId(), dto.getVremePocetka(), dto.getVremeKraja(), dto.getBrojCasova(), realizacijaPredmeta, kalendar, dto.getVidljiv());

	}

	@Override
	protected void updateEntityFromDto(TerminNastaveDTO dto, TerminNastave entity) {
		if (dto.getVremePocetka() != null) {
			entity.setVremePocetka(dto.getVremePocetka());
		}
		if (dto.getVremeKraja() != null) {
			entity.setVremeKraja(dto.getVremeKraja());
		}
		if (dto.getBrojCasova() != null) {
			entity.setBrojCasova(dto.getBrojCasova());
		}
		if (dto.getVidljiv() != null) {
			entity.setVidljiv(dto.getVidljiv());
		}

		if (dto.getRealizacijaPredmeta() != null) {
			if (dto.getRealizacijaPredmeta().getId() != null) {
				RealizacijaPredmeta realizacijaPredmeta = realizacijaPredmetaRepository.findById(dto.getRealizacijaPredmeta().getId())
					.orElseThrow(() -> new RuntimeException("RealizacijaPredmeta sa ID " + dto.getRealizacijaPredmeta().getId() + " ne postoji."));
				entity.setRealizacijaPredmeta(realizacijaPredmeta);
			} else {
				entity.setRealizacijaPredmeta(null);
			}
		}

		if (dto.getKalendar() != null) {
			if (dto.getKalendar().getId() != null) {
				Kalendar kalendar = kalendarRepository.findById(dto.getKalendar().getId())
					.orElseThrow(() -> new RuntimeException("Kalendar sa ID " + dto.getKalendar().getId() + " ne postoji."));
				entity.setKalendar(kalendar);
			} else {
				entity.setKalendar(null);
			}
		}
	}

}
