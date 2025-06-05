package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.DrzavaDTO;
import server.DTOs.GradDTO;
import server.model.Drzava;
import server.model.Grad;
import server.repository.GradRepository;

@Service
public class GradService extends BaseService<Grad, GradDTO, Long>{


	@Autowired
	private GradRepository gradRepository;

  @Override
 protected CrudRepository<Grad, Long> getRepository() {
      return gradRepository;
  }

	@Override
	protected GradDTO convertToDTO(Grad entity) {
		return new GradDTO(entity.getId(),entity.getNaziv(),new DrzavaDTO(entity.getDrzava().getId(),entity.getDrzava().getNaziv(),null,entity.getDrzava().getVidljiv()),entity.getVidljiv());
	}

	@Override
	protected Grad convertToEntity(GradDTO dto) {

		return new Grad(dto.getId(),dto.getNaziv(),new Drzava(dto.getDrzava().getId(),dto.getDrzava().getNaziv(),null,dto.getDrzava().getVidljiv()),dto.getVidljiv());		}



}
