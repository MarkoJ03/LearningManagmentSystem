package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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


@Service
public class DepartmanService extends BaseService<Departman, DepartmanDTO, Long>{


	@Autowired
	private DepartmanRepository departmanRepository;

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
		
		
		return new DepartmanDTO(entity.getId(),entity.getNaziv()

				,new FakultetDTO(entity.getFakultet().getId(),entity.getFakultet().getNaziv(), null,null, entity.getFakultet().getVidljiv()),
				new NastavnikDTO(entity.getSekretarDepartmana().getId(),null, entity.getSekretarDepartmana().getIme(),entity.getSekretarDepartmana().getPrezime(),entity.getSekretarDepartmana().getJmbg(),null,null,null, null,null,null, entity.getSekretarDepartmana().getVidljiv()),
				new NastavnikDTO(entity.getDirektorDepartmana().getId(),null, entity.getDirektorDepartmana().getIme(),entity.getDirektorDepartmana().getPrezime(),entity.getDirektorDepartmana().getJmbg(),null,null,null, null,null,null, entity.getDirektorDepartmana().getVidljiv()),
						null,katedre, entity.getVidljiv());

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
	        fakultet = new Fakultet(
	            dto.getFakultet().getId(),
	            dto.getFakultet().getNaziv(),
	            null, null,
	            dto.getFakultet().getVidljiv()
	        );
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

	    // Inicijalizujemo departman bez many to many liste
	    Departman departman = new Departman(
	        dto.getId(),
	        dto.getNaziv(),
	        fakultet,
	        sekretar,
	        direktor,
	        new ArrayList<>(),  // departman nastavnik
	        katedre,
	        dto.getVidljiv()
	    );

	    ArrayList<DepartmanNastavnik> departmanNastavnici = new ArrayList<>();
	    if (dto.getNastavnici() != null) {
	        for (DepartmanNastavnikDTO dnDto : dto.getNastavnici()) {
	            NastavnikDTO n = dnDto.getNastavnik(); // vadi nastavnik DTO

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
	                dn.setDepartman(departman); // trenutni departman
	                dn.setNastavnik(nastavnik); // setujemo nastavnika

	                departmanNastavnici.add(dn);
	            }
	        }
	    }

	    // set departman nastavnik u listu
	    departman.setNastavnici(departmanNastavnici);

	    return departman;
	}

	@Override
	protected void updateEntityFromDto(DepartmanDTO dto, Departman entity) {
		// TODO Auto-generated method stub
		
	}


}