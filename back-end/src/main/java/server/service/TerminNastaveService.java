package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.KalendarDTO;
import server.DTOs.RealizacijaPredmetaDTO;
import server.DTOs.TerminNastaveDTO;
import server.model.Kalendar;
import server.model.RealizacijaPredmeta;
import server.model.TerminNastave;
import server.repository.TerminNastaveRepository;

@Service
public class TerminNastaveService extends BaseService<TerminNastave, TerminNastaveDTO, Long>{

	@Autowired
	private TerminNastaveRepository terminNastaveRepository;

	@Override
	protected CrudRepository<TerminNastave, Long> getRepository() {
		return terminNastaveRepository;
	}

	@Override
	protected TerminNastaveDTO convertToDTO(TerminNastave entity) {
		RealizacijaPredmetaDTO realizacijaPredmeta = new RealizacijaPredmetaDTO(entity.getRealizacijaPredmeta().getId(),

				null, null, null, null ,null, entity.getRealizacijaPredmeta().getVidljiv());
		KalendarDTO kalendar = new KalendarDTO(entity.getKalendar().getId(), null,null,null,null, entity.getKalendar().getVidljiv());

		return new TerminNastaveDTO(entity.getId(), entity.getVremePocetka(), entity.getVremeKraja(), entity.getBrojCasova(), realizacijaPredmeta, kalendar, entity.getVidljiv());

	}

	@Override
	protected TerminNastave convertToEntity(TerminNastaveDTO dto) {
		RealizacijaPredmeta realizacijaPredmeta = new RealizacijaPredmeta(dto.getRealizacijaPredmeta().getId(),

				null, null, null, null ,null, dto.getRealizacijaPredmeta().getVidljiv());
		Kalendar kalendar = new Kalendar(dto.getKalendar().getId(), null,null,null,null, dto.getKalendar().getVidljiv());

		return new TerminNastave(dto.getId(), dto.getVremePocetka(), dto.getVremeKraja(), dto.getBrojCasova(), realizacijaPredmeta, kalendar, dto.getVidljiv());

	}

}
