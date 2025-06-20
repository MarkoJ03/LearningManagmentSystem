package server.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.BibliotekaKnjigaDTO;
import server.DTOs.DepartmanDTO;
import server.DTOs.DepartmanNastavnikDTO;
import server.DTOs.NastavnikDTO;
import server.model.Departman;
import server.model.DepartmanNastavnik;
import server.model.Nastavnik;
import server.repository.DepartmanNastavnikRepository;
import server.repository.DepartmanRepository;
import server.repository.NastavnikRepository;

@Service
public class DepartmanNastavnikService extends BaseService<DepartmanNastavnik, DepartmanNastavnikDTO, Long>{


	@Autowired
	private DepartmanNastavnikRepository departmanNastavnikRepository;

	@Autowired
	private DepartmanRepository departmanRepository;
	
	@Autowired
	private NastavnikRepository nastavnikRepository;
	
  @Override
 protected CrudRepository<DepartmanNastavnik, Long> getRepository() {
      return departmanNastavnikRepository;
  }

  @Override
  protected DepartmanNastavnikDTO convertToDTO(DepartmanNastavnik entity) {
      DepartmanDTO departmanDTO = null;
      if (entity.getDepartman() != null) {
          departmanDTO = new DepartmanDTO(entity.getDepartman().getId(), entity.getDepartman().getNaziv(), null, null, null, null, null, null);
      }

      NastavnikDTO nastavnikDTO = null;
      if (entity.getNastavnik() != null) {
          nastavnikDTO = new NastavnikDTO(entity.getNastavnik().getId(), null, entity.getNastavnik().getIme(), entity.getNastavnik().getPrezime(), entity.getNastavnik().getJmbg(), null, null, null, null, null, null, entity.getNastavnik().getVidljiv());
      }

      return new DepartmanNastavnikDTO(entity.getId(), departmanDTO, nastavnikDTO, entity.getVidljiv());
  }

  @Override
  protected DepartmanNastavnik convertToEntity(DepartmanNastavnikDTO dto) {
      DepartmanNastavnik departmanNastavnik = new DepartmanNastavnik();
      departmanNastavnik.setId(dto.getId()); 

      departmanNastavnik.setVidljiv(dto.getVidljiv());

      if (dto.getDepartman() != null && dto.getDepartman().getId() != null) {
          Departman departman = departmanRepository.findById(dto.getDepartman().getId())
                                  .orElseThrow(() -> new RuntimeException("Departman not found with ID: " + dto.getDepartman().getId()));
          departmanNastavnik.setDepartman(departman);
      } else {
          throw new IllegalArgumentException("Departman information is missing for DepartmanNastavnik.");
      }

      if (dto.getNastavnik() != null && dto.getNastavnik().getId() != null) {
          Nastavnik nastavnik = nastavnikRepository.findById(dto.getNastavnik().getId())
                                  .orElseThrow(() -> new RuntimeException("Nastavnik not found with ID: " + dto.getNastavnik().getId()));
          departmanNastavnik.setNastavnik(nastavnik);
      } else {
          throw new IllegalArgumentException("Nastavnik information is missing for DepartmanNastavnik.");
      }

      return departmanNastavnik;
  }


	@Override
	protected void updateEntityFromDto(DepartmanNastavnikDTO dto, DepartmanNastavnik entity) {
		// TODO Auto-generated method stub
		
	}

	public List<DepartmanNastavnikDTO> findByDepartmanId(Long departmanId) {
	    return departmanNastavnikRepository.findByDepartmanIdAndVidljivTrue(departmanId)
	            .stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	}


	
	

}