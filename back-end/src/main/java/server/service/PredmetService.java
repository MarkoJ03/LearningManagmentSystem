package server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.DepartmanDTO;
import server.DTOs.DepartmanNastavnikDTO;
import server.DTOs.DokumentiPredmetaDTO;
import server.DTOs.EvaluacijaZnanjaDTO;
import server.DTOs.GrupaStudenataDTO;
import server.DTOs.GrupaStudenataPredmetDTO;
import server.DTOs.KatedraDTO;
import server.DTOs.KatedraNastavnikDTO;
import server.DTOs.NastavnikDTO;
import server.DTOs.ObavestenjeDTO;
import server.DTOs.PredmetDTO;
import server.DTOs.PredmetRealizacijePredmetaDTO;
import server.DTOs.RealizacijaPredmetaDTO;
import server.DTOs.StudijskiProgramDTO;
import server.model.Departman;
import server.model.DokumentiPredmeta;
import server.model.EvaluacijaZnanja;
import server.model.GrupaStudenata;
import server.model.GrupaStudenataPredmet;
import server.model.KatedraNastavnik;
import server.model.Korisnik;
import server.model.Nastavnik;
import server.model.Obavestenje;
import server.model.Predmet;
import server.model.PredmetRealizacijePredmeta;
import server.model.RealizacijaPredmeta;
import server.model.StudijskiProgram;
import server.repository.DokumentiPredmetaRepository;
import server.repository.EvaluacijaZnanjaRepository;
import server.repository.GrupaStudenataRepository;
import server.repository.ObavestenjeRepository;
import server.repository.PredmetRepository;
import server.repository.RealizacijaPredmetaRepository;

@Service
public class PredmetService extends BaseService<Predmet, PredmetDTO, Long> {

	public Predmet getById(Long id) {
		return predmetRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Predmet sa id " + id + " nije pronađen."));
	}

	@Autowired
	private PredmetRepository predmetRepository;
	
	@Autowired
	private EvaluacijaZnanjaRepository evaluacijaZnanjaRepository;

	@Autowired
	private ObavestenjeRepository obavestenjeRepository;
	
	@Autowired
	private GrupaStudenataRepository grupaStudenataRepository;
	
	@Autowired
	private RealizacijaPredmetaRepository realizacijaPredmetaRepository;
	
	@Autowired
	@Lazy
	private ObavestenjeService obavestenjeService;

	@Autowired
	@Lazy
	private RealizacijaPredmetaService realizacijaPredmetaService;

	@Autowired
	@Lazy
	private SilabusService silabusService;
	@Autowired
	@Lazy
	private EvaluacijaZnanjaService evaluacijaZnanjaService;
	
	@Autowired
	private DokumentiPredmetaRepository dokumentiPredmetaRepository;

	@Override
	protected CrudRepository<Predmet, Long> getRepository() {
		return predmetRepository;
	}

	@Override
	protected PredmetDTO convertToDTO(Predmet entity) {

		DokumentiPredmetaDTO dokumentiPredmeta = null;
		if (entity.getDokumentiPredmeta() != null) {
			dokumentiPredmeta = new DokumentiPredmetaDTO(entity.getDokumentiPredmeta().getId(), null,
					entity.getDokumentiPredmeta().getAkreditacija(), null, entity.getDokumentiPredmeta().getVidljiv());
		}
		
		List<PredmetRealizacijePredmetaDTO> realizacijePredmeta = entity.getRealizacijePredmeta() != null ?
	            entity.getRealizacijePredmeta().stream()
	                .map(rp -> {
	                    RealizacijaPredmetaDTO realizacijaDTO = null;
	                    if (rp.getRealizacijaPredmeta() != null) {
	                        realizacijaDTO = new RealizacijaPredmetaDTO(rp.getRealizacijaPredmeta().getId(), null, null, null, null, null, rp.getRealizacijaPredmeta().getVidljiv());
	                    }
	                    return new PredmetRealizacijePredmetaDTO(rp.getId(), null, realizacijaDTO, rp.getVidljiv());
	                })
	                .collect(Collectors.toList()) :
	            new ArrayList<>();

		ArrayList<ObavestenjeDTO> obavestenja = new ArrayList<>();

		for (Obavestenje o : entity.getObavestenja()) {
			ObavestenjeDTO oDTO = new ObavestenjeDTO(o.getId(), o.getNaslov(), o.getSadrzaj(),
					o.getNastavnik() != null
							? new NastavnikDTO(o.getNastavnik().getId(), null, null, null, null, null, null, null, null,
									null, null, o.getNastavnik().getVidljiv())
							: null,
					null, o.getVidljiv());
			obavestenja.add(oDTO);
		}

		ArrayList<EvaluacijaZnanjaDTO> evaluacijeZnanja = new ArrayList<>();

		for (EvaluacijaZnanja e : entity.getEvaluacijeZnanja()) {
            EvaluacijaZnanjaDTO eDTO = new EvaluacijaZnanjaDTO(
                e.getId(),
                e.getVremePocetka(),
                e.getVremeZavrsetka(),
                null,
                e.getPredmet() != null ? new PredmetDTO(e.getPredmet().getId(), e.getPredmet().getNaziv(), null, null, null, null, null, null, null, null, null, null, null, null, null, e.getPredmet().getVidljiv()) : null, 
                e.getNastavnik() != null ? new NastavnikDTO(e.getNastavnik().getId(), null, null, null, null, null, null, null, null, null, null, e.getNastavnik().getVidljiv()) : null,
                null,
                null,
                e.getVidljiv()
            );
            evaluacijeZnanja.add(eDTO);
        }
		
		List<GrupaStudenataPredmetDTO> grupaStudenataPredmetDTO = entity.getGrupeStudenata() != null ?
	            entity.getGrupeStudenata().stream()
	                .map(gs -> {
	                    GrupaStudenataDTO grupaStudenataDTO = null;
	                    if (gs.getGrupaStudenata() != null) {
	                    	grupaStudenataDTO = new GrupaStudenataDTO(gs.getGrupaStudenata().getId(), null, null, null, gs.getGrupaStudenata().getVidljiv());
	                    }
	                    return new GrupaStudenataPredmetDTO(gs.getId(), grupaStudenataDTO, null, gs.getVidljiv());
	                })
	                .collect(Collectors.toList()) :
	            new ArrayList<>();

		return new PredmetDTO(entity.getId(), entity.getNaziv(), entity.getEsbp(), entity.getObavezan(),
				entity.getBrojPredavanja(), entity.getBrojVezbi(), entity.getIstrazivackiRad(),
				entity.getBrojSemestara(), entity.getOpis(), entity.getCilj(), dokumentiPredmeta, evaluacijeZnanja,
				grupaStudenataPredmetDTO, realizacijePredmeta, obavestenja, entity.getVidljiv());

	}

	@Override
	protected Predmet convertToEntity(PredmetDTO dto) {
		Predmet predmet = new Predmet();
		//predmet.setId(dto.getId());
		predmet.setNaziv(dto.getNaziv());
		predmet.setBrojPredavanja(dto.getBrojPredavanja());
		predmet.setBrojVezbi(dto.getBrojVezbi());
		predmet.setBrojSemestara(dto.getBrojSemestara());
		predmet.setCilj(dto.getCilj());
		predmet.setEsbp(dto.getEsbp());
		predmet.setIstrazivackiRad(dto.getIstrazivackiRad());
		predmet.setOpis(dto.getOpis());
		predmet.setObavezan(dto.getObavezan());
		predmet.setVidljiv(dto.getVidljiv());		
		
		if (dto.getDokumentiPredmeta() != null && dto.getDokumentiPredmeta().getId() != null) {
	        DokumentiPredmeta existingDokumenti = dokumentiPredmetaRepository.findById(dto.getDokumentiPredmeta().getId())
	            .orElseThrow(() -> new RuntimeException("Dokumenti with ID " + dto.getDokumentiPredmeta().getId() + " not found."));
	        predmet.setDokumentiPredmeta(existingDokumenti);
	    } else {
	        predmet.setDokumentiPredmeta(null);
	    }
		
		List<Obavestenje> obavestenjaList = new ArrayList<>();
        if (dto.getObavestenja() != null) {
            for (ObavestenjeDTO oDto : dto.getObavestenja()) {
                if (oDto.getId() == null) {
                    throw new IllegalArgumentException("Obavestenje DTO must have an ID if selected from list.");
                }
                Obavestenje existingObavestenje = obavestenjeService.getRepository().findById(oDto.getId())
                        .orElseThrow(() -> new RuntimeException("Obavestenje not found with id " + oDto.getId()));
                obavestenjaList.add(existingObavestenje);
                existingObavestenje.setPredmet(predmet);
            }
        }
        predmet.setObavestenja(obavestenjaList);


        ArrayList<EvaluacijaZnanja> evaluacijeZnanja = new ArrayList<>();

		if (dto.getEvaluacijeZnanja() != null) {
			for (EvaluacijaZnanjaDTO eDto : dto.getEvaluacijeZnanja()) {
				if (eDto.getId() != null) {

					EvaluacijaZnanja existingEvaluacija = evaluacijaZnanjaService.getRepository().findById(eDto.getId())
							.orElseThrow(() -> new RuntimeException("Evaluacija znanja not found with id " + eDto.getId()));

					existingEvaluacija.setPredmet(predmet);

					evaluacijeZnanja.add(existingEvaluacija);
				}
			}
		}

		predmet.setEvaluacijeZnanja(evaluacijeZnanja);
		
		List<GrupaStudenataPredmet> grupeLinks = new ArrayList<>();
		if (dto.getGrupeStudenata() != null) {
			for (GrupaStudenataPredmetDTO gspDTO : dto.getGrupeStudenata()) {
				if (gspDTO.getGrupaStudenata() != null && gspDTO.getGrupaStudenata().getId() != null) {
					Optional<GrupaStudenata> optGrupa= grupaStudenataRepository.findById(gspDTO.getGrupaStudenata().getId());
					if (optGrupa.isPresent()) {
						GrupaStudenataPredmet gsp = new GrupaStudenataPredmet();
						gsp.setPredmet(predmet); 
						gsp.setGrupaStudenata(optGrupa.get());
						gsp.setVidljiv(gspDTO.getVidljiv() != null ? gspDTO.getVidljiv() : true);
						grupeLinks.add(gsp);
					}
				}
			}
		}
		predmet.setGrupeStudenata(grupeLinks);
		
		List<PredmetRealizacijePredmeta> realizacijeLinks = new ArrayList<>();
		if (dto.getRealizacijePredmeta() != null) {
			for (PredmetRealizacijePredmetaDTO prpDTO : dto.getRealizacijePredmeta()) {
				if (prpDTO.getRealizacijaPredmeta() != null && prpDTO.getRealizacijaPredmeta().getId() != null) {
					Optional<RealizacijaPredmeta> optRealizacija = realizacijaPredmetaRepository.findById(prpDTO.getRealizacijaPredmeta().getId());
					if (optRealizacija.isPresent()) {
						PredmetRealizacijePredmeta prp = new PredmetRealizacijePredmeta();
						prp.setPredmet(predmet); 
						prp.setRealizacijaPredmeta(optRealizacija.get());
						prp.setVidljiv(prpDTO.getVidljiv() != null ? prpDTO.getVidljiv() : true);
						realizacijeLinks.add(prp);
					}
				}
			}
		}
		predmet.setRealizacijePredmeta(realizacijeLinks);
		
		return predmet;

	}

	@Override
	protected void updateEntityFromDto(PredmetDTO dto, Predmet entity) {
		Predmet predmet = new Predmet();
		predmet.setNaziv(dto.getNaziv());
		predmet.setEsbp(dto.getEsbp());
		predmet.setObavezan(dto.getObavezan());
		predmet.setBrojPredavanja(dto.getBrojPredavanja());
		predmet.setBrojVezbi(dto.getBrojVezbi());
		predmet.setIstrazivackiRad(dto.getIstrazivackiRad());
		predmet.setBrojSemestara(dto.getBrojSemestara());
		predmet.setOpis(dto.getOpis());
		predmet.setCilj(dto.getCilj());
		predmet.setVidljiv(dto.getVidljiv());
		
		if (dto.getDokumentiPredmeta() != null && dto.getDokumentiPredmeta().getId() != null) {
	        DokumentiPredmeta dokumentiPredmeta = new DokumentiPredmeta();
	        dokumentiPredmeta.setId(dto.getDokumentiPredmeta().getId());
	        entity.setDokumentiPredmeta(dokumentiPredmeta);
	    }
		
		List<EvaluacijaZnanja> updatedEvaluacije = new ArrayList<>();
	    if (dto.getEvaluacijeZnanja() != null) {
	        for (EvaluacijaZnanjaDTO ezDTO : dto.getEvaluacijeZnanja()) {
	            if (ezDTO.getId() != null) {
	                evaluacijaZnanjaRepository.findById(ezDTO.getId())
	                    .ifPresent(updatedEvaluacije::add);
	            }
	        }
	    }
	    entity.getEvaluacijeZnanja().clear();
	    for (EvaluacijaZnanja ez : updatedEvaluacije) {
	        ez.setPredmet(entity);
	        entity.getEvaluacijeZnanja().add(ez);
	    }

	    List<Obavestenje> updatedObavestenja = new ArrayList<>();
	    if (dto.getObavestenja() != null) {
	        for (ObavestenjeDTO oDTO : dto.getObavestenja()) {
	            if (oDTO.getId() != null) {
	                obavestenjeRepository.findById(oDTO.getId())
	                    .ifPresent(updatedObavestenja::add);
	            }
	        }
	    }
	    entity.getObavestenja().clear();
	    for (Obavestenje o : updatedObavestenja) {
	        o.setPredmet(entity);
	        entity.getObavestenja().add(o);
	    }
	    
	    List<PredmetRealizacijePredmeta> updatedRealizacije = new ArrayList<>();
	    if (dto.getRealizacijePredmeta() != null) {
	        for (PredmetRealizacijePredmetaDTO prpDTO : dto.getRealizacijePredmeta()) {
	            if (prpDTO.getRealizacijaPredmeta() != null && prpDTO.getRealizacijaPredmeta().getId() != null) {
	                Optional<RealizacijaPredmeta> optRealizacija = realizacijaPredmetaRepository.findById(prpDTO.getRealizacijaPredmeta().getId());
	                if (optRealizacija.isPresent()) {
	                    PredmetRealizacijePredmeta prp = new PredmetRealizacijePredmeta();
	                    prp.setPredmet(entity);
	                    prp.setRealizacijaPredmeta(optRealizacija.get());
	                    prp.setVidljiv(prpDTO.getVidljiv() != null ? prpDTO.getVidljiv() : true);
	                    updatedRealizacije.add(prp);
	                }
	            }
	        }
	    }
	    entity.getRealizacijePredmeta().clear();
	    entity.getRealizacijePredmeta().addAll(updatedRealizacije);
	    
	    List<GrupaStudenataPredmet> updatedStudenti = new ArrayList<>();
	    if (dto.getGrupeStudenata() != null) {
	        for (GrupaStudenataPredmetDTO gspDTO : dto.getGrupeStudenata()) {
	            if (gspDTO.getGrupaStudenata() != null && gspDTO.getGrupaStudenata().getId() != null) {
	                Optional<GrupaStudenata> optGrupa = grupaStudenataRepository.findById(gspDTO.getGrupaStudenata().getId());
	                if (optGrupa.isPresent()) {
	                    GrupaStudenataPredmet gsp = new GrupaStudenataPredmet();
	                    gsp.setPredmet(entity);
	                    gsp.setGrupaStudenata(optGrupa.get());
	                    gsp.setVidljiv(gspDTO.getVidljiv() != null ? gspDTO.getVidljiv() : true);
	                    updatedStudenti.add(gsp);
	                }
	            }
	        }
	    }
	    entity.getGrupeStudenata().clear();
	    entity.getGrupeStudenata().addAll(updatedStudenti);
	}

}
