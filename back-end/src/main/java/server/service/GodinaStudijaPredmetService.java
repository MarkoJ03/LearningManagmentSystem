package server.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.GodinaStudijaDTO;
import server.DTOs.GodinaStudijaPredmetDTO;
import server.DTOs.PredmetDTO;
import server.model.GodinaStudija;
import server.model.GodinaStudijaPredmet;
import server.model.Predmet;
import server.repository.GodinaStudijaPredmetRepository;

@Service
public class GodinaStudijaPredmetService extends BaseService<GodinaStudijaPredmet, GodinaStudijaPredmetDTO, Long>{

	@Autowired
	private GodinaStudijaPredmetRepository godinaStudijaPredmetRepository;

	@Override
	protected CrudRepository<GodinaStudijaPredmet, Long> getRepository() {
		return godinaStudijaPredmetRepository;
	}

	@Override
	protected GodinaStudijaPredmetDTO convertToDTO(GodinaStudijaPredmet entity) {

		GodinaStudijaDTO godinaStudija = new GodinaStudijaDTO(entity.getGodinaStudija().getId(),
				entity.getGodinaStudija().getGodina(), null, null, entity.getGodinaStudija().getVidljiv());
		PredmetDTO predmet = new PredmetDTO(entity.getPredmet().getId(),entity.getPredmet().getNaziv(), entity.getPredmet().getEsbp(),
				entity.getPredmet().getObavezan(), entity.getPredmet().getBrojPredavanja(), entity.getPredmet().getBrojVezbi(),
				entity.getPredmet().getIstrazivackiRad(), entity.getPredmet().getBrojSemestara(), entity.getPredmet().getOpis(),
				entity.getPredmet().getCilj(), null, null,null,null, entity.getPredmet().getVidljiv());

		return new GodinaStudijaPredmetDTO(entity.getId(),godinaStudija ,predmet,entity.getVidljiv());

	}

	@Override
	protected GodinaStudijaPredmet convertToEntity(GodinaStudijaPredmetDTO dto) {

		GodinaStudija godinaStudija = new GodinaStudija(dto.getGodinaStudija().getId(),
				dto.getGodinaStudija().getGodina(), null, null,dto.getGodinaStudija().getVidljiv());
		Predmet predmet = new Predmet(dto.getPredmet().getId(),dto.getPredmet().getNaziv(), dto.getPredmet().getEsbp(),
				dto.getPredmet().getObavezan(), dto.getPredmet().getBrojPredavanja(), dto.getPredmet().getBrojVezbi(),
				dto.getPredmet().getIstrazivackiRad(), dto.getPredmet().getBrojSemestara(), dto.getPredmet().getOpis(),
				dto.getPredmet().getCilj(), null, null,null,null, dto.getPredmet().getVidljiv());

		return new GodinaStudijaPredmet(dto.getId(),godinaStudija, predmet,dto.getVidljiv());

	}

	public List<GodinaStudijaPredmetDTO> findByGodinaStudijaId(Long godinaId) {
	    return godinaStudijaPredmetRepository.findByGodinaStudijaIdAndVidljivTrue(godinaId)
	            .stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	}
}
