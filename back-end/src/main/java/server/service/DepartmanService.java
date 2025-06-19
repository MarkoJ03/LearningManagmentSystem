package server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.NastavnikDTO;
import server.DTOs.ZvanjeDTO;
import server.DTOs.DepartmanDTO;
import server.DTOs.DepartmanNastavnikDTO;
import server.DTOs.FakultetDTO;
import server.DTOs.KatedraDTO;
import server.model.Nastavnik;
import server.model.Zvanje;
import server.model.Departman;
import server.model.DepartmanNastavnik;
import server.model.Fakultet;
import server.model.Katedra;
import server.repository.DepartmanRepository;
import server.repository.KatedraRepository;
import server.repository.NastavnikRepository;

@Service
public class DepartmanService extends BaseService<Departman, DepartmanDTO, Long> {

	@Autowired
	private DepartmanRepository departmanRepository;

	@Autowired
	private NastavnikRepository nastavnikRepository;
	
	@Autowired
	@Lazy
	private NastavnikService nService;
	
	@Autowired
	private KatedraRepository katedraRepository;


	@Autowired
	@Lazy
	private KatedraService KatedraService;

	@Override
	protected CrudRepository<Departman, Long> getRepository() {
		return departmanRepository;
	}

	@Override
	protected DepartmanDTO convertToDTO(Departman entity) {

		ArrayList<KatedraDTO> katedre = new ArrayList<>();
		for (Katedra k : entity.getKatedre()) {
			KatedraDTO kDTO = KatedraService.convertToDTO(k);
			katedre.add(kDTO);
		}

		return new DepartmanDTO(entity.getId(), entity.getNaziv(),
				new FakultetDTO(entity.getFakultet().getId(), entity.getFakultet().getNaziv(), null, null,
						entity.getFakultet().getVidljiv()),
						nService.convertToDTO(entity.getSekretarDepartmana()),
						nService.convertToDTO(entity.getDirektorDepartmana()),
				null, katedre, entity.getVidljiv());


	}

	@Override
	protected Departman convertToEntity(DepartmanDTO dto) {
		ArrayList<Katedra> katedre = new ArrayList<>();
		if (dto.getKatedre() != null) {
			for (KatedraDTO k : dto.getKatedre()) {
				katedre.add(KatedraService.convertToEntity(k));
			}
		}

		Fakultet fakultet = null;
		if (dto.getFakultet() != null) {
			fakultet = new Fakultet(dto.getFakultet().getId(), dto.getFakultet().getNaziv(), null, null,
					dto.getFakultet().getVidljiv());
		}


	    Nastavnik sekretar = null;
	    if (dto.getSekretarDepartmana() != null) {
	        sekretar = new Nastavnik(
	            dto.getSekretarDepartmana().getId(),
	            null,
	            dto.getSekretarDepartmana().getIme(),
	            dto.getSekretarDepartmana().getPrezime(),
	            dto.getSekretarDepartmana().getJmbg(),
	            null, null,
	            null, null, null, null,
	            dto.getSekretarDepartmana().getVidljiv()
	        );
	    }

	    Nastavnik direktor = null;
	    if (dto.getDirektorDepartmana() != null) {
	        direktor = new Nastavnik(
	            dto.getDirektorDepartmana().getId(),
	            null,
	            dto.getDirektorDepartmana().getIme(),
	            dto.getDirektorDepartmana().getPrezime(),
	            dto.getDirektorDepartmana().getJmbg(),
	            null, null,
	            null, null, null, null,
	            dto.getDirektorDepartmana().getVidljiv()
	        );
	    }

		
		Departman departman = new Departman(dto.getId(), dto.getNaziv(), fakultet, sekretar, direktor,
				new ArrayList<>(), 
				katedre, dto.getVidljiv());


	    ArrayList<DepartmanNastavnik> departmanNastavnici = new ArrayList<>();
	    if (dto.getNastavnici() != null) {
	        for (DepartmanNastavnikDTO dnDto : dto.getNastavnici()) {
	            NastavnikDTO n = dnDto.getNastavnik(); 

	            if (n != null) {
	                Nastavnik nastavnik = new Nastavnik(
	                    n.getId(),
	                    null,
	                    n.getIme(),
	                    n.getPrezime(),
	                    n.getJmbg(),
	                    null, null,
	                    null, null, null, null,
	                    n.getVidljiv()
	                );

					DepartmanNastavnik dn = new DepartmanNastavnik();
					dn.setDepartman(departman); 
					dn.setNastavnik(nastavnik); 

					departmanNastavnici.add(dn);
				}
			}
		}

		
		departman.setNastavnici(departmanNastavnici);

		return departman;
	}

	@Override
	protected void updateEntityFromDto(DepartmanDTO dto, Departman entity) {
		entity.setNaziv(dto.getNaziv());

		if (dto.getFakultet() != null && dto.getFakultet().getId() != null) {
			Fakultet fak = new Fakultet();
			fak.setId(dto.getFakultet().getId());
			entity.setFakultet(fak);
		}

		if (dto.getSekretarDepartmana() != null && dto.getSekretarDepartmana().getId() != null) {
			nastavnikRepository.findById(dto.getSekretarDepartmana().getId()).ifPresent(entity::setSekretarDepartmana);
		}

		if (dto.getDirektorDepartmana() != null && dto.getDirektorDepartmana().getId() != null) {
			nastavnikRepository.findById(dto.getDirektorDepartmana().getId()).ifPresent(entity::setDirektorDepartmana);
		}
		List<DepartmanNastavnik> updatedLinks = new ArrayList<>();
		if (dto.getNastavnici() != null) {
			for (DepartmanNastavnikDTO knDTO : dto.getNastavnici()) {
				if (knDTO.getNastavnik() != null && knDTO.getNastavnik().getId() != null) {
					Optional<Nastavnik> optNastavnik = nastavnikRepository.findById(knDTO.getNastavnik().getId());
					if (optNastavnik.isPresent()) {
						DepartmanNastavnik dn = new DepartmanNastavnik();
						dn.setDepartman(entity);
						dn.setNastavnik(optNastavnik.get());
						dn.setVidljiv(knDTO.getVidljiv() != null ? knDTO.getVidljiv() : true);
						updatedLinks.add(dn);
					}
				}
			}
		}
		entity.getNastavnici().clear();
		entity.getNastavnici().addAll(updatedLinks);

		List<Katedra> updatedKatedra = new ArrayList<>();
		if (dto.getKatedre() != null) {
			for (KatedraDTO katDTO : dto.getKatedre()) {
				if (katDTO.getId() != null) {
					katedraRepository.findById(katDTO.getId()).ifPresent(updatedKatedra::add);
				}
			}
		}
		entity.getKatedre().clear();
		for (Katedra kat : updatedKatedra) {
			kat.setDepartman(entity);
			entity.getKatedre().add(kat);
		}

		entity.setVidljiv(dto.getVidljiv());
	}


}