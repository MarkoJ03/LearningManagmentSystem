package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.SilabusTerminDTO;
import server.model.SilabusTermin;
import server.repository.SilabusTerminRepository;

@Service
public class SilabusTerminService extends BaseService<SilabusTermin, SilabusTerminDTO, Long>{


	@Autowired
	private SilabusTerminRepository silabusTerminRepository;
	
	@Autowired
	@Lazy
	private SilabusService silabusService;
	
	@Autowired
	@Lazy
	private NastavnikService nastavnikService;
	
	

  @Override
 protected CrudRepository<SilabusTermin, Long> getRepository() {
      return silabusTerminRepository;
  }

	@Override
	protected SilabusTerminDTO convertToDTO(SilabusTermin entity) {
		return new SilabusTerminDTO(entity.getId(),entity.getDatum(),entity.getMaterijal(),entity.getCilj(), entity.getOpis(),nastavnikService.convertToDTO(entity.getNastavnik()),silabusService.convertToDTO(entity.getSilabus()), entity.getVidljiv());
	}

	@Override
	protected SilabusTermin convertToEntity(SilabusTerminDTO dto) {

		return new SilabusTermin(dto.getId(),dto.getDatum(),dto.getMaterijal(),dto.getCilj(), dto.getOpis(),nastavnikService.convertToEntity(dto.getNastavnik()),silabusService.convertToEntity(dto.getSilabus()), dto.getVidljiv());
		}



}
