package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.UniverzitetDTO;
import server.DTOs.DepartmanDTO;
import server.DTOs.FakultetDTO;

import server.model.Univerzitet;
import server.model.Departman;
import server.model.Fakultet;
import server.repository.FakultetRepository;

@Service
public class FakultetService extends BaseService<Fakultet, FakultetDTO, Long> {

	@Autowired
	private FakultetRepository fakultetRepository;

	@Autowired
	@Lazy
	private DepartmanService departmanService;

	@Autowired
	@Lazy
	private UniverzitetService univerzitetService;

	@Override
	protected CrudRepository<Fakultet, Long> getRepository() {
		return fakultetRepository;
	}

	@Override
	protected FakultetDTO convertToDTO(Fakultet entity) {

		ArrayList<DepartmanDTO> departmani = new ArrayList<>();

		for (Departman s : entity.getDepartmani()) {
			DepartmanDTO e = departmanService.convertToDTO(s);
			departmani.add(e);
		}

		return new FakultetDTO(entity.getId(), entity.getNaziv(),
				new UniverzitetDTO(entity.getUniverzitet().getId(), entity.getUniverzitet().getNaziv(), null, null,
						null, entity.getUniverzitet().getEmail(), entity.getUniverzitet().getKontakt(),
						entity.getUniverzitet().getVidljiv()),
				departmani, entity.getVidljiv());

	}

//	@Override
//	protected Fakultet convertToEntity(FakultetDTO dto) {
//
//		ArrayList<Departman> departmani = new ArrayList<>();
//
//		for (DepartmanDTO s : dto.getDepartmani()) {
//			Departman e = departmanService.convertToEntity(s);
//			departmani.add(e);
//		}
//
//		return new Fakultet(dto.getId(), dto.getNaziv(),
//				new Univerzitet(dto.getUniverzitet().getId(), dto.getUniverzitet().getNaziv(), null, null, null,
//						dto.getUniverzitet().getEmail(), dto.getUniverzitet().getKontakt(),
//						dto.getUniverzitet().getVidljiv()),
//				departmani, dto.getVidljiv());
//
//	}
	
	@Override
	protected Fakultet convertToEntity(FakultetDTO dto) {
	    Fakultet fakultet = new Fakultet();
	    fakultet.setId(dto.getId());
	    fakultet.setNaziv(dto.getNaziv());
	    fakultet.setVidljiv(dto.getVidljiv());
	    fakultet.setUniverzitet(
	        new Univerzitet(dto.getUniverzitet().getId(), dto.getUniverzitet().getNaziv(), null, null, null,
	                        dto.getUniverzitet().getEmail(), dto.getUniverzitet().getKontakt(),
	                        dto.getUniverzitet().getVidljiv())
	    );

	    ArrayList<Departman> departmani = new ArrayList<>();

	    if (dto.getDepartmani() != null) {
	        for (DepartmanDTO dDto : dto.getDepartmani()) {
	            if (dDto.getId() != null) {

	                Departman existingDepartman = departmanService.getRepository().findById(dDto.getId())
	                    .orElseThrow(() -> new RuntimeException("Departman not found with id " + dDto.getId()));


	                existingDepartman.setFakultet(fakultet);

	                departmani.add(existingDepartman);
	            }
	        }
	    }

	    fakultet.setDepartmani(departmani);

	    return fakultet;
	}


}