package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.DokumentiPredmetaDTO;
import server.DTOs.PredmetDTO;
import server.model.DokumentiPredmeta;
import server.model.Predmet;
import server.repository.DokumentiPredmetaRepository;

@Service
public class DokumentiPredmetaService extends BaseService<DokumentiPredmeta, DokumentiPredmetaDTO, Long>{

	@Autowired
	private DokumentiPredmetaRepository dokumentiPredmetaRepository;
	
	@Autowired
	@Lazy
	private SilabusService silabusService;

	@Override
	protected CrudRepository<DokumentiPredmeta, Long> getRepository() {
		return dokumentiPredmetaRepository;
	}

	@Override
	protected DokumentiPredmetaDTO convertToDTO(DokumentiPredmeta entity) {
		PredmetDTO predmet = new PredmetDTO(entity.getPredmet().getId(),entity.getPredmet().getNaziv(), entity.getPredmet().getEsbp(),
				entity.getPredmet().getObavezan(), entity.getPredmet().getBrojPredavanja(), entity.getPredmet().getBrojVezbi(),
				entity.getPredmet().getIstrazivackiRad(), entity.getPredmet().getBrojSemestara(), entity.getPredmet().getOpis(),
				entity.getPredmet().getCilj(), null, null,null,null,entity.getPredmet().getVidljiv());

		return new DokumentiPredmetaDTO(entity.getId(), silabusService.convertToDTO(entity.getSilabus()), entity.getAkreditacija(), predmet,entity.getVidljiv());
	}

	@Override
	protected DokumentiPredmeta convertToEntity(DokumentiPredmetaDTO dto) {
		Predmet predmet = new Predmet(dto.getPredmet().getId(),dto.getPredmet().getNaziv(), dto.getPredmet().getEsbp(),
				dto.getPredmet().getObavezan(), dto.getPredmet().getBrojPredavanja(), dto.getPredmet().getBrojVezbi(),
				dto.getPredmet().getIstrazivackiRad(), dto.getPredmet().getBrojSemestara(), dto.getPredmet().getOpis(),
				dto.getPredmet().getCilj(), null, null,null,null, dto.getPredmet().getVidljiv());

		return new DokumentiPredmeta(dto.getId(), silabusService.convertToEntity(dto.getSilabus()), dto.getAkreditacija(), predmet,dto.getVidljiv());
	}

}
