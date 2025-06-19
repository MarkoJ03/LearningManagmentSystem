package server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.DepartmanNastavnikDTO;
import server.DTOs.IshodPredmetaDTO;
import server.DTOs.NastavnikDTO;
import server.DTOs.PredmetDTO;
import server.DTOs.PredmetRealizacijePredmetaDTO;
import server.DTOs.RealizacijaPredmetaDTO;
import server.DTOs.TerminNastaveDTO;
import server.DTOs.TipNastaveDTO;
import server.model.Departman;
import server.model.DepartmanNastavnik;
import server.model.IshodPredmeta;
import server.model.Nastavnik;
import server.model.Predmet;
import server.model.PredmetRealizacijePredmeta;
import server.model.RealizacijaPredmeta;
import server.model.TerminNastave;
import server.model.TipNastave;
import server.repository.IshodPredmetaRepository;
import server.repository.NastavnikRepository;
import server.repository.PredmetRepository;
import server.repository.RealizacijaPredmetaRepository;
import server.repository.TerminNastaveRepository;
import server.repository.TipNastaveRepository;

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
	
	@Autowired
	private NastavnikRepository nastavnikRepository;
	@Autowired
	private TipNastaveRepository tipNastaveRepository;
	@Autowired
	private PredmetRepository predmetRepository;
	@Autowired
	private IshodPredmetaRepository ishodPredmetaRepository;
	@Autowired
	private TerminNastaveRepository terminNastaveRepository;

	@Override
	protected CrudRepository<RealizacijaPredmeta, Long> getRepository() {
		return realizacijaPredmetaRepository;
	}

	@Override
	protected RealizacijaPredmetaDTO convertToDTO(RealizacijaPredmeta entity) {

		NastavnikDTO nastavnik = new NastavnikDTO(entity.getNastavnik().getId(),null, entity.getNastavnik().getIme(),
				entity.getNastavnik().getPrezime(), entity.getNastavnik().getJmbg(), null, null, null, null,null,null, entity.getNastavnik().getVidljiv());
		
		TipNastaveDTO tipNastave = new TipNastaveDTO(entity.getTipNastave().getId(), entity.getTipNastave().getNaziv(),
				null, entity.getTipNastave().getVidljiv());
		
		List<PredmetRealizacijePredmetaDTO> predmeti = entity.getPredmeti() != null ?
	            entity.getPredmeti().stream()
	                .map(p -> {
	                    PredmetDTO predmetDTO = null;
	                    if (p.getPredmet() != null) {
	                        predmetDTO = new PredmetDTO(p.getPredmet().getId(), p.getPredmet().getNaziv(), null,null,null,null,null,null,null,null,null,null,null,null,null,p.getPredmet().getVidljiv());
	                    }
	                    return new PredmetRealizacijePredmetaDTO(p.getId(), predmetDTO, null, p.getVidljiv());
	                })
	                .collect(Collectors.toList()) :
	            new ArrayList<>();

		ArrayList<TerminNastaveDTO> terminiNastave = new ArrayList<>();

		for(TerminNastave tn : entity.getTerminiNastave()) {
			TerminNastaveDTO tnDTO = terminNastaveService.convertToDTO(tn);
			terminiNastave.add(tnDTO);
		}

		IshodPredmetaDTO ishodPredmeta = null; 
		if (entity.getIshodPredmeta() != null) {
			ishodPredmeta = new IshodPredmetaDTO(
				entity.getIshodPredmeta().getId(),
				entity.getIshodPredmeta().getOcena(),
				null, null, null 
			);
		}

		return new RealizacijaPredmetaDTO(entity.getId(), nastavnik, tipNastave, predmeti, terminiNastave, ishodPredmeta, entity.getVidljiv());

	}

	@Override
	protected RealizacijaPredmeta convertToEntity(RealizacijaPredmetaDTO dto) {
		RealizacijaPredmeta realizacijaPredmeta = new RealizacijaPredmeta();
		realizacijaPredmeta.setId(dto.getId());
		realizacijaPredmeta.setVidljiv(dto.getVidljiv());
		
		if (dto.getNastavnik() != null && dto.getNastavnik().getId() != null) {
			Nastavnik nastavnik = new Nastavnik();
			nastavnik.setId(dto.getNastavnik().getId());
			realizacijaPredmeta.setNastavnik(nastavnik);
		}
		
		if (dto.getTipNastave() != null && dto.getTipNastave().getId() != null) {
			TipNastave tipNastave = new TipNastave();
			tipNastave.setId(dto.getTipNastave().getId());
			realizacijaPredmeta.setTipNastave(tipNastave);
		}
		
		if (dto.getIshodPredmeta() != null && dto.getIshodPredmeta().getId() != null) {
			IshodPredmeta ishodPredmeta = new IshodPredmeta();
			ishodPredmeta.setId(dto.getIshodPredmeta().getId());
			realizacijaPredmeta.setIshodPredmeta(ishodPredmeta);
		}
		
		ArrayList<TerminNastave> terminiNastave = new ArrayList<>();
		
		if (dto.getTerminiNastave() != null) {
			for (TerminNastaveDTO tDTO : dto.getTerminiNastave()) {
				if (tDTO.getId() != null) {
					
					TerminNastave existingTermin = terminNastaveService.getRepository().findById(tDTO.getId())
							.orElseThrow(() -> new RuntimeException("Termin nastave not found with id " +  tDTO.getId()));
					
					existingTermin.setRealizacijaPredmeta(realizacijaPredmeta);
					terminiNastave.add(existingTermin);
				}
			}
		}
		
		realizacijaPredmeta.setTerminiNastave(terminiNastave);
		return realizacijaPredmeta;
	}

	@Override
	protected void updateEntityFromDto(RealizacijaPredmetaDTO dto, RealizacijaPredmeta entity) {
		entity.setVidljiv(dto.getVidljiv());
		
		if (dto.getNastavnik() != null && dto.getNastavnik().getId() != null) {
			nastavnikRepository.findById(dto.getNastavnik().getId())
			.ifPresent(entity::setNastavnik);
		}
		
		if (dto.getTipNastave() != null && dto.getTipNastave().getId() != null) {
			tipNastaveRepository.findById(dto.getTipNastave().getId())
			.ifPresent(entity::setTipNastave);
		}
		
		List<PredmetRealizacijePredmeta> updatedLinks = new ArrayList<>();
	    if (dto.getPredmeti() != null) {
	        for (PredmetRealizacijePredmetaDTO prpDTO : dto.getPredmeti()) {
	            if (prpDTO.getPredmet() != null && prpDTO.getPredmet().getId() != null) {
	                Optional<Predmet> optPredmet = predmetRepository.findById(prpDTO.getPredmet().getId());
	                if (optPredmet.isPresent()) {
	                    PredmetRealizacijePredmeta prp = new PredmetRealizacijePredmeta();
	                    prp.setRealizacijaPredmeta(entity);
	                    prp.setPredmet(optPredmet.get());
	                    prp.setVidljiv(prpDTO.getVidljiv() != null ? prpDTO.getVidljiv() : true);
	                    updatedLinks.add(prp);
	                }
	            }
	        }
	    }
	    entity.getPredmeti().clear();
	    entity.getPredmeti().addAll(updatedLinks);
		
		if (dto.getIshodPredmeta() != null && dto.getIshodPredmeta().getId() != null) {
			ishodPredmetaRepository.findById(dto.getIshodPredmeta().getId())
			.ifPresent(entity::setIshodPredmeta);
		}
		
		List<TerminNastave> updatedTermini = new ArrayList<>();
		if (dto.getTerminiNastave() != null) {
			for (TerminNastaveDTO tDTO : dto.getTerminiNastave()) {
				if (tDTO.getId() != null) {
					terminNastaveRepository.findById(tDTO.getId())
					.ifPresent(updatedTermini::add);
				}
			}
		}
		entity.getTerminiNastave().clear();
		for (TerminNastave tn : updatedTermini) {
			tn.setRealizacijaPredmeta(entity);
			entity.getTerminiNastave().add(tn);
		}
	}

}
