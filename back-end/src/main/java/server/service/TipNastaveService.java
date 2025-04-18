package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.RealizacijaPredmetaDTO;
import server.DTOs.TipNastaveDTO;
import server.model.RealizacijaPredmeta;
import server.model.TipNastave;
import server.repository.TipNastaveRepository;

@Service
public class TipNastaveService extends BaseService<TipNastave, TipNastaveDTO, Long>{

	@Autowired
	private TipNastaveRepository tipNastaveRepository;

	@Autowired
	@Lazy
	private RealizacijaPredmetaService realizacijaPredmetaService;

	@Override
	protected CrudRepository<TipNastave, Long> getRepository() {
		return tipNastaveRepository;
	}

	@Override
	protected TipNastaveDTO convertToDTO(TipNastave entity) {
		ArrayList<RealizacijaPredmetaDTO> realizacijePredmeta = new ArrayList<>();
		for(RealizacijaPredmeta rp : entity.getRealizacijePredmeta()) {
			RealizacijaPredmetaDTO rpDTO = realizacijaPredmetaService.convertToDTO(rp);
			realizacijePredmeta.add(rpDTO);
		}

		return new TipNastaveDTO(entity.getId(), entity.getNaziv(), realizacijePredmeta, entity.getVidljiv());
	}

	@Override
	protected TipNastave convertToEntity(TipNastaveDTO dto) {
		ArrayList<RealizacijaPredmeta> realizacijePredmeta = new ArrayList<>();
		for(RealizacijaPredmetaDTO rpDTO : dto.getRealizacijaPredmeta()) {
			RealizacijaPredmeta rp = realizacijaPredmetaService.convertToEntity(rpDTO);
			realizacijePredmeta.add(rp);
		}

		return new TipNastave(dto.getId(), dto.getNaziv(), realizacijePredmeta, dto.getVidljiv());
	}

}
