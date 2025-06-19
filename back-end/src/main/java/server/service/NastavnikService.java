package server.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.DepartmanDTO;
import server.DTOs.DepartmanNastavnikDTO;
import server.DTOs.DodeljenoPravoPristupaDTO;
import server.DTOs.EvaluacijaZnanjaDTO;
import server.DTOs.KatedraDTO;
import server.DTOs.KatedraNastavnikDTO;

import server.DTOs.KorisnikDTO;
import server.DTOs.NastavnikDTO;
import server.DTOs.ObavestenjeDTO;
import server.DTOs.PredmetDTO;
import server.DTOs.PredmetRealizacijePredmetaDTO;
import server.DTOs.RealizacijaPredmetaDTO;
import server.DTOs.StudijskiProgramDTO;
import server.DTOs.ZvanjeDTO;
import server.model.Departman;
import server.model.DepartmanNastavnik;
import server.model.DodeljenoPravoPristupa;
import server.model.EvaluacijaZnanja;
import server.model.Katedra;
import server.model.KatedraNastavnik;

import server.model.Korisnik;
import server.model.Nastavnik;
import server.model.Obavestenje;
import server.model.RealizacijaPredmeta;
import server.model.StudijskiProgram;
import server.model.Zvanje;
import server.repository.DepartmanNastavnikRepository;
import server.repository.DepartmanRepository;
import server.repository.DodeljenoPravoPristupaRepository;
import server.repository.EvaluacijaZnanjaRepository;
import server.repository.KatedraNastavnikRepository;
import server.repository.KatedraRepository;
import server.repository.KorisnikRepository;
import server.repository.NastavnikRepository;
import server.repository.ObavestenjeRepository;
import server.repository.RealizacijaPredmetaRepository;
import server.repository.ZvanjeRepository;

@Service
public class NastavnikService extends BaseService<Nastavnik, NastavnikDTO, Long> {

	@Autowired
	private NastavnikRepository nastavnikRepository;

	@Autowired
	@Lazy
	private ZvanjeService zvanjeService;
	@Autowired
	@Lazy
	private DodeljenoPravoPristupaService dodeljenoPravoPrisupaService;
	@Autowired
	@Lazy
	private DepartmanNastavnikService departmanNastavnikService;
	@Autowired
	@Lazy
	private KatedraNastavnikService katedraNastavnikService;
	@Autowired
	@Lazy
	private RealizacijaPredmetaService realizacijaPredmetaService;
	@Autowired
	@Lazy
	private ObavestenjeService obavestenjeService;
	@Autowired
	@Lazy
	private EvaluacijaZnanjaService evaluacijaZnanjaService;

	@Autowired
	private ZvanjeRepository zvanjeRepository;
	@Autowired
	private DepartmanNastavnikRepository departmanNastavnikRepository;
	@Autowired
	private KatedraNastavnikRepository katedraNastavnikRepository;
	@Autowired
	private DepartmanRepository departmanRepository;
	@Autowired
	private KatedraRepository katedraRepository;
	@Autowired
	private RealizacijaPredmetaRepository realizacijaPredmetaRepository;
	@Autowired
	private ObavestenjeRepository obavestenjeRepository;
	@Autowired
	private EvaluacijaZnanjaRepository evaluacijaZnanjaRepository;
	@Autowired
	private KorisnikRepository korisnikRepository;

	@Override
	protected CrudRepository<Nastavnik, Long> getRepository() {
		return nastavnikRepository;
	}

	@Override
	protected NastavnikDTO convertToDTO(Nastavnik entity) {
		
		KorisnikDTO korisnik = new KorisnikDTO(entity.getKorisnik().getId(), entity.getKorisnik().getEmail(), null, null,entity.getKorisnik().getVidljiv());

		ArrayList<ZvanjeDTO> zvanja = new ArrayList<>();

		for (Zvanje z : entity.getZvanja()) {
			ZvanjeDTO zDTO = zvanjeService.convertToDTO(z);
			zvanja.add(zDTO);
		}
		
		List<DepartmanNastavnikDTO> departmaniNastavniciDTO = entity.getDepartmani() != null ? // <--- Use the correct getter for the join entity
	            entity.getDepartmani().stream()
	                .map(dn -> {
	                    DepartmanDTO departmanDTO = null;
	                    if (dn.getDepartman() != null) {
	                        departmanDTO = new DepartmanDTO(dn.getDepartman().getId(), dn.getDepartman().getNaziv(), null, null, null, null, null, null);
	                    }
	                    return new DepartmanNastavnikDTO(dn.getId(), departmanDTO, null, dn.getVidljiv());
	                })
	                .collect(Collectors.toList()) :
	            new ArrayList<>();
		
		List<KatedraNastavnikDTO> katedreNastavniciDTO = entity.getKatedre() != null ? 
	            entity.getKatedre().stream()
	                .map(kn -> {
	                    KatedraDTO katedraDTO = null;
	                    if (kn.getKatedra() != null) {
	                        katedraDTO = new KatedraDTO(kn.getKatedra().getId(), kn.getKatedra().getNaziv(), null, null, null, null, null, kn.getKatedra().getVidljiv());
	                    }
	                    return new KatedraNastavnikDTO(kn.getId(), katedraDTO, null, kn.getVidljiv());
	                })
	                .collect(Collectors.toList()) :
	            new ArrayList<>();
		

		ArrayList<RealizacijaPredmetaDTO> realizacijePredmeta = new ArrayList<>();

        for (RealizacijaPredmeta rp : entity.getRealizacijePredmeta()) {
            
        	List<PredmetRealizacijePredmetaDTO> predmetiDTO = null;

        	if (rp.getPredmeti() != null) {
        	    predmetiDTO = rp.getPredmeti().stream()
        	        .map(prp -> {
        	            PredmetDTO predmetDTO = new PredmetDTO();
        	            predmetDTO.setId(prp.getPredmet().getId());
        	            predmetDTO.setNaziv(prp.getPredmet().getNaziv());
        	            predmetDTO.setEsbp(prp.getPredmet().getEsbp());        	            
        	            predmetDTO.setVidljiv(prp.getPredmet().getVidljiv());

        	            return new PredmetRealizacijePredmetaDTO(
        	                prp.getId(),
        	                predmetDTO,
        	                null,            
        	                prp.getVidljiv()
        	            );
        	        })
        	        .collect(Collectors.toList());
        	}

        	RealizacijaPredmetaDTO rpDTO = new RealizacijaPredmetaDTO(
                rp.getId(),
                rp.getNastavnik() != null ? new NastavnikDTO(rp.getNastavnik().getId(), null, null, null, null, null, null, null, null, null, null, rp.getNastavnik().getVidljiv()) : null,
                null,
                predmetiDTO,
                null,
                null,
                rp.getVidljiv()
            );
            realizacijePredmeta.add(rpDTO);
        }



		ArrayList<ObavestenjeDTO> obavestenja = new ArrayList<>();

		for (Obavestenje o : entity.getObavestenja()) {
            ObavestenjeDTO oDTO = new ObavestenjeDTO(
                o.getId(),
                o.getNaslov(),
                o.getSadrzaj(),
                o.getNastavnik() != null ? new NastavnikDTO(o.getNastavnik().getId(), null, null, null, null, null, null, null, null, null, null, o.getNastavnik().getVidljiv()) : null,
                null, 
                o.getVidljiv()
            );
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
                e.getNastavnik() != null ? new NastavnikDTO(e.getNastavnik().getId(), e.getNastavnik().getIme(), e.getNastavnik().getPrezime(), e.getNastavnik().getJmbg(), null, null, null, null, null, null, e.getNastavnik().getVidljiv()) : null,
                null,
                null,
                e.getVidljiv()
            );
            evaluacijeZnanja.add(eDTO);
        }


		return new NastavnikDTO(entity.getId(), korisnik,entity.getIme(), entity.getPrezime(), entity.getJmbg(), zvanja,
				 departmaniNastavniciDTO, katedreNastavniciDTO,realizacijePredmeta, obavestenja,evaluacijeZnanja, entity.getVidljiv());

	}

	@Override
	protected Nastavnik convertToEntity(NastavnikDTO dto) {
		Nastavnik nastavnik = new Nastavnik();
		nastavnik.setId(dto.getId());
		nastavnik.setIme(dto.getIme());
		nastavnik.setPrezime(dto.getPrezime());
		nastavnik.setJmbg(dto.getJmbg());
		nastavnik.setVidljiv(dto.getVidljiv());

		if (dto.getKorisnik() != null && dto.getKorisnik().getId() != null) {
			Korisnik existingKorisnik = korisnikRepository.findById(dto.getKorisnik().getId()).orElseThrow(
					() -> new RuntimeException("Korisnik with ID " + dto.getKorisnik().getId() + " not found."));
			nastavnik.setKorisnik(existingKorisnik);
		} else {
			throw new IllegalArgumentException("Korisnik information (ID) is missing for Nastavnik.");
		}

		ArrayList<Zvanje> zvanja = new ArrayList<>();

		if (dto.getZvanja() != null) {
			for (ZvanjeDTO zDto : dto.getZvanja()) {
				if (zDto.getId() != null) {

					Zvanje existingZvanje = zvanjeService.getRepository().findById(zDto.getId()).orElseThrow(
							() -> new RuntimeException("Studijski program not found with id " + zDto.getId()));

					existingZvanje.setNastavnik(nastavnik);

					zvanja.add(existingZvanje);
				}
			}
		}

		nastavnik.setZvanja(zvanja);

		ArrayList<RealizacijaPredmeta> realizacijePredmeta = new ArrayList<>();

		if (dto.getRealizacijePredmeta() != null) {
			for (RealizacijaPredmetaDTO rDto : dto.getRealizacijePredmeta()) {
				if (rDto.getId() != null) {

					RealizacijaPredmeta existingRealizacija = realizacijaPredmetaService.getRepository()
							.findById(rDto.getId()).orElseThrow(
									() -> new RuntimeException("Studijski program not found with id " + rDto.getId()));

					existingRealizacija.setNastavnik(nastavnik);

					realizacijePredmeta.add(existingRealizacija);
				}
			}
		}

		nastavnik.setRealizacijePredmeta(realizacijePredmeta);

		ArrayList<Obavestenje> obavestenja = new ArrayList<>();

		if (dto.getObavestenja() != null) {
			for (ObavestenjeDTO oDto : dto.getObavestenja()) {
				if (oDto.getId() != null) {

					Obavestenje existingObavestenje = obavestenjeService.getRepository().findById(oDto.getId())
							.orElseThrow(
									() -> new RuntimeException("Studijski program not found with id " + oDto.getId()));

					existingObavestenje.setNastavnik(nastavnik);

					obavestenja.add(existingObavestenje);
				}
			}
		}

		nastavnik.setObavestenja(obavestenja);

		ArrayList<EvaluacijaZnanja> evaluacijeZnanja = new ArrayList<>();

		if (dto.getEvaluacijeZnanja() != null) {
			for (EvaluacijaZnanjaDTO eDto : dto.getEvaluacijeZnanja()) {
				if (eDto.getId() != null) {

					EvaluacijaZnanja existingEvaluacija = evaluacijaZnanjaService.getRepository().findById(eDto.getId())
							.orElseThrow(
									() -> new RuntimeException("Evaluacija znanja not found with id " + eDto.getId()));

					existingEvaluacija.setNastavnik(nastavnik);

					evaluacijeZnanja.add(existingEvaluacija);
				}
			}
		}

		nastavnik.setEvaluacijeZnanja(evaluacijeZnanja);

		return nastavnik;
	}

	@Override
	protected void updateEntityFromDto(NastavnikDTO dto, Nastavnik entity) {
		entity.getIme();
		entity.getPrezime();
		entity.getJmbg();
		entity.getVidljiv();

		if (dto.getKorisnik() != null && dto.getKorisnik().getId() != null) {
			Korisnik existingKorisnik = korisnikRepository.findById(dto.getKorisnik().getId()).orElseThrow(
					() -> new RuntimeException("Korisnik with ID " + dto.getKorisnik().getId() + " not found."));
			entity.setKorisnik(existingKorisnik);
		}

		List<Zvanje> updatedZvanja = new ArrayList<>();
		if (dto.getZvanja() != null) {
			for (ZvanjeDTO zDTO : dto.getZvanja()) {
				if (zDTO.getId() != null) {
					zvanjeRepository.findById(zDTO.getId()).ifPresent(updatedZvanja::add);
				}
			}
		}
		entity.getZvanja().clear();
		for (Zvanje z : updatedZvanja) {
			z.setNastavnik(entity);
			entity.getZvanja().add(z);
		}

		List<RealizacijaPredmeta> updatedRealizacijaPredmeta = new ArrayList<>();
		if (dto.getRealizacijePredmeta() != null) {
			for (RealizacijaPredmetaDTO rDTO : dto.getRealizacijePredmeta()) {
				if (rDTO.getId() != null) {
					realizacijaPredmetaRepository.findById(rDTO.getId()).ifPresent(updatedRealizacijaPredmeta::add);
				}
			}
		}
		entity.getRealizacijePredmeta().clear();
		for (RealizacijaPredmeta r : updatedRealizacijaPredmeta) {
			r.setNastavnik(entity);
			entity.getRealizacijePredmeta().add(r);
		}

		List<Obavestenje> updatedObavestenja = new ArrayList<>();
		if (dto.getObavestenja() != null) {
			for (ObavestenjeDTO oDTO : dto.getObavestenja()) {
				if (oDTO.getId() != null) {
					obavestenjeRepository.findById(oDTO.getId()).ifPresent(updatedObavestenja::add);
				}
			}
		}
		entity.getObavestenja().clear();
		for (Obavestenje o : updatedObavestenja) {
			o.setNastavnik(entity);
			entity.getObavestenja().add(o);
		}

		List<EvaluacijaZnanja> updatedEvaluacije = new ArrayList<>();
		if (dto.getEvaluacijeZnanja() != null) {
			for (EvaluacijaZnanjaDTO eDTO : dto.getEvaluacijeZnanja()) {
				if (eDTO.getId() != null) {
					evaluacijaZnanjaRepository.findById(eDTO.getId()).ifPresent(updatedEvaluacije::add);
				}
			}
		}
		entity.getEvaluacijeZnanja().clear();
		for (EvaluacijaZnanja e : updatedEvaluacije) {
			e.setNastavnik(entity);
			entity.getEvaluacijeZnanja().add(e);
		}

		List<KatedraNastavnik> updatedLinksK = new ArrayList<>();
		if (dto.getKatedre() != null) {
			for (KatedraNastavnikDTO knDTO : dto.getKatedre()) {
				if (knDTO.getKatedra() != null && knDTO.getKatedra().getId() != null) {
					Optional<Katedra> optKatedra = katedraRepository.findById(knDTO.getKatedra().getId());
					if (optKatedra.isPresent()) {
						KatedraNastavnik kn = new KatedraNastavnik();
						kn.setNastavnik(entity);
						kn.setKatedra(optKatedra.get());
						kn.setVidljiv(knDTO.getVidljiv() != null ? knDTO.getVidljiv() : true);
						updatedLinksK.add(kn);
					}
				}
			}
		}
		entity.getKatedre().clear();
		entity.getKatedre().addAll(updatedLinksK);

		List<DepartmanNastavnik> updatedLinksD = new ArrayList<>();
		if (dto.getDepartmani() != null) {
			for (DepartmanNastavnikDTO dnDTO : dto.getDepartmani()) {
				if (dnDTO.getDepartman() != null && dnDTO.getDepartman().getId() != null) {
					Optional<Departman> optDepartman = departmanRepository.findById(dnDTO.getDepartman().getId());
					if (optDepartman.isPresent()) {
						DepartmanNastavnik dn = new DepartmanNastavnik();
						dn.setNastavnik(entity);
						dn.setDepartman(optDepartman.get());
						dn.setVidljiv(dnDTO.getVidljiv() != null ? dnDTO.getVidljiv() : true);
						updatedLinksD.add(dn);
					}
				}
			}
		}
		entity.getDepartmani().clear();
		entity.getDepartmani().addAll(updatedLinksD);
	}

	

}
