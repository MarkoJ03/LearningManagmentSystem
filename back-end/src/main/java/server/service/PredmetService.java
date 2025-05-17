package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.DokumentiPredmetaDTO;
import server.DTOs.PredmetDTO;
import server.DTOs.RealizacijaPredmetaDTO;
import server.model.DokumentiPredmeta;
import server.model.Predmet;
import server.model.RealizacijaPredmeta;
import server.repository.PredmetRepository;

@Service
public class PredmetService extends BaseService<Predmet, PredmetDTO, Long>{

	@Autowired
	private PredmetRepository predmetRepository;

	@Autowired
	@Lazy
	private RealizacijaPredmetaService realizacijaPredmetaService;

	@Override
	protected CrudRepository<Predmet, Long> getRepository() {
		return predmetRepository;
	}

	@Override
	protected PredmetDTO convertToDTO(Predmet entity) {
		DokumentiPredmetaDTO dokumentiPredmeta = new DokumentiPredmetaDTO(entity.getDokumentiPredmeta().getId(),
				entity.getDokumentiPredmeta().getSilabus(), entity.getDokumentiPredmeta().getAkreditacija(), null, entity.getDokumentiPredmeta().getVidljiv());

		ArrayList<RealizacijaPredmetaDTO> realizacijePredmeta = new ArrayList<>();
		for(RealizacijaPredmeta rp : entity.getRealizacijePredmeta()) {
			RealizacijaPredmetaDTO rpDTO = realizacijaPredmetaService.convertToDTO(rp);
			realizacijePredmeta.add(rpDTO);
		}

		return new PredmetDTO(entity.getId(),entity.getNaziv(), entity.getEsbp(), entity.getObavezan(),
				entity.getBrojPredavanja(), entity.getBrojVezbi(), entity.getIstrazivackiRad(),
				entity.getBrojSemestara(), entity.getOpis(), entity.getCilj(), dokumentiPredmeta,null,null, realizacijePredmeta,entity.getVidljiv());
	}

	@Override
	protected Predmet convertToEntity(PredmetDTO dto) {
		DokumentiPredmeta dokumentiPredmeta = new DokumentiPredmeta(dto.getDokumentiPredmeta().getId(),
				dto.getDokumentiPredmeta().getSilabus(), dto.getDokumentiPredmeta().getAkreditacija(), null, dto.getDokumentiPredmeta().getVidljiv());

		ArrayList<RealizacijaPredmeta> realizacijePredmeta = new ArrayList<>();
		for(RealizacijaPredmetaDTO rpDTO : dto.getRealizacijePredmeta()) {
			RealizacijaPredmeta rp = realizacijaPredmetaService.convertToEntity(rpDTO);
			realizacijePredmeta.add(rp);
		}

		return new Predmet(dto.getId(),dto.getNaziv(), dto.getEsbp(), dto.getObavezan(), dto.getBrojPredavanja(),
				dto.getBrojVezbi(), dto.getIstrazivackiRad(), dto.getBrojSemestara(), dto.getOpis(),
				dto.getCilj(), dokumentiPredmeta,null,null, realizacijePredmeta,dto.getVidljiv());
	}

}
