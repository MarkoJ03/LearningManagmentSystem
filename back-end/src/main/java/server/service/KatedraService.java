package server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.NastavnikDTO;
import server.DTOs.StudijskiProgramDTO;
import server.DTOs.KatedraDTO;
import server.DTOs.KatedraNastavnikDTO;
import server.DTOs.DepartmanDTO;

import server.model.Nastavnik;
import server.model.StudijskiProgram;
import server.model.Katedra;
import server.model.KatedraNastavnik;
import server.model.Departman;
import server.repository.KatedraRepository;
import server.repository.NastavnikRepository;
import server.repository.StudijskiProgramRepository;

@Service
public class KatedraService extends BaseService<Katedra, KatedraDTO, Long> {

	@Autowired
	private KatedraRepository katedraRepository;

	@Autowired
	private KatedraNastavnikService katedraNastavnikService;

	@Autowired
	@Lazy
	private StudijskiProgramService studijskiProgramService;
	
	@Autowired
	private NastavnikRepository nastavnikRepository;
	
	@Autowired 
	private StudijskiProgramRepository studijskiProgramRepository;

	@Override
	protected CrudRepository<Katedra, Long> getRepository() {
		return katedraRepository;
	}

	@Override
	protected KatedraDTO convertToDTO(Katedra entity) {
		ArrayList<StudijskiProgramDTO> programi = new ArrayList<>();
		for (StudijskiProgram dto1 : entity.getStudijskiProgrami()) {
			StudijskiProgramDTO s = studijskiProgramService.convertToDTO(dto1);
			programi.add(s);
		}

		List<KatedraNastavnikDTO> nastavnici = katedraNastavnikService.findByKatedraId(entity.getId());

		return new KatedraDTO(entity.getId(), entity.getNaziv(),
				new DepartmanDTO(entity.getDepartman().getId(), entity.getDepartman().getNaziv(), null, null, null,
						null, null, null),
				new NastavnikDTO(entity.getSekretarKatedre().getId(), null, entity.getSekretarKatedre().getIme(),
						entity.getSekretarKatedre().getPrezime(), entity.getSekretarKatedre().getJmbg(), null, null,
						null, null, null, null, entity.getSekretarKatedre().getVidljiv()),
				new NastavnikDTO(entity.getSefKatedre().getId(), null, entity.getSefKatedre().getIme(),
						entity.getSefKatedre().getPrezime(), entity.getSefKatedre().getJmbg(), null, null, null, null,
						null, null, entity.getSefKatedre().getVidljiv()),
				nastavnici, programi, entity.getVidljiv());
	}

	@Override
	protected Katedra convertToEntity(KatedraDTO dto) {
		Katedra katedra = new Katedra();
		katedra.setId(dto.getId());
		katedra.setNaziv(dto.getNaziv());

		if (dto.getDepartman() != null && dto.getDepartman().getId() != null) {
			Departman departman = new Departman();
			departman.setId(dto.getDepartman().getId());
			katedra.setDepartman(departman);
		}

		if (dto.getSekretarKatedre() != null && dto.getSekretarKatedre().getId() != null) {
			Nastavnik sekretar = new Nastavnik();
			sekretar.setId(dto.getSekretarKatedre().getId());
			katedra.setSekretarKatedre(sekretar);
		}

		if (dto.getSefKatedre() != null && dto.getSefKatedre().getId() != null) {
			Nastavnik sef = new Nastavnik();
			sef.setId(dto.getSefKatedre().getId());
			katedra.setSefKatedre(sef);
		}
		
		List<KatedraNastavnik> nastavniciLinks = new ArrayList<>();
		if (dto.getNastavnici() != null) {
			for (KatedraNastavnikDTO knDTO : dto.getNastavnici()) {
				if (knDTO.getNastavnik() != null && knDTO.getNastavnik().getId() != null) {
					Optional<Nastavnik> optNastavnik = nastavnikRepository.findById(knDTO.getNastavnik().getId());
					if (optNastavnik.isPresent()) {
						KatedraNastavnik kn = new KatedraNastavnik();
						kn.setKatedra(katedra); 
						kn.setNastavnik(optNastavnik.get());
						kn.setVidljiv(knDTO.getVidljiv() != null ? knDTO.getVidljiv() : true);
						nastavniciLinks.add(kn);
					}
				}
			}
		}
		katedra.setNastavnici(nastavniciLinks);

		ArrayList<StudijskiProgram> programi = new ArrayList<>();

		if (dto.getStudijskiProgrami() != null) {
			for (StudijskiProgramDTO sDto : dto.getStudijskiProgrami()) {
				if (sDto.getId() != null) {

					StudijskiProgram existingProgram = studijskiProgramService.getRepository().findById(sDto.getId())
							.orElseThrow(() -> new RuntimeException("Studijski program not found with id " + sDto.getId()));

					existingProgram.setKatedra(katedra);

					programi.add(existingProgram);
				}
			}
		}

		katedra.setStudijskiProgrami(programi);

		return katedra;
	}

	@Override
	protected void updateEntityFromDto(KatedraDTO dto, Katedra entity) {
		entity.setNaziv(dto.getNaziv());

	    if (dto.getDepartman() != null && dto.getDepartman().getId() != null) {
	        Departman dep = new Departman();
	        dep.setId(dto.getDepartman().getId());
	        entity.setDepartman(dep);
	    }

	    if (dto.getSekretarKatedre() != null && dto.getSekretarKatedre().getId() != null) {
	        nastavnikRepository.findById(dto.getSekretarKatedre().getId())
	            .ifPresent(entity::setSekretarKatedre);
	    }

	    if (dto.getSefKatedre() != null && dto.getSefKatedre().getId() != null) {
	        nastavnikRepository.findById(dto.getSefKatedre().getId())
	            .ifPresent(entity::setSefKatedre);
	    }

	    List<KatedraNastavnik> updatedLinks = new ArrayList<>();
	    if (dto.getNastavnici() != null) {
	        for (KatedraNastavnikDTO knDTO : dto.getNastavnici()) {
	            if (knDTO.getNastavnik() != null && knDTO.getNastavnik().getId() != null) {
	                Optional<Nastavnik> optNastavnik = nastavnikRepository.findById(knDTO.getNastavnik().getId());
	                if (optNastavnik.isPresent()) {
	                    KatedraNastavnik kn = new KatedraNastavnik();
	                    kn.setKatedra(entity);
	                    kn.setNastavnik(optNastavnik.get());
	                    kn.setVidljiv(knDTO.getVidljiv() != null ? knDTO.getVidljiv() : true);
	                    updatedLinks.add(kn);
	                }
	            }
	        }
	    }
	    entity.getNastavnici().clear();
	    entity.getNastavnici().addAll(updatedLinks);

	    List<StudijskiProgram> updatedProgrami = new ArrayList<>();
	    if (dto.getStudijskiProgrami() != null) {
	        for (StudijskiProgramDTO spDTO : dto.getStudijskiProgrami()) {
	            if (spDTO.getId() != null) {
	                studijskiProgramRepository.findById(spDTO.getId())
	                    .ifPresent(updatedProgrami::add);
	            }
	        }
	    }
	    entity.getStudijskiProgrami().clear();
	    for (StudijskiProgram sp : updatedProgrami) {
	        sp.setKatedra(entity);
	        entity.getStudijskiProgrami().add(sp);
	    }

	    entity.setVidljiv(dto.getVidljiv());
	}


}