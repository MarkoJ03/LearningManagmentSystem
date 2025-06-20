package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.IspitniRokDTO;
import server.model.IspitniRok;
import server.repository.IspitniRokRepository;

@Service
public class IspitniRokService extends BaseService<IspitniRok, IspitniRokDTO, Long>{


	@Autowired
	private IspitniRokRepository ispitniRokRepository;

  @Override
 protected CrudRepository<IspitniRok, Long> getRepository() {
      return ispitniRokRepository;
  }

	@Override
	protected IspitniRokDTO convertToDTO(IspitniRok entity) {
		return new IspitniRokDTO(entity.getId(),entity.getNaziv(),entity.getDatumPocetka(),entity.getDatumZavrsetka(),entity.getVidljiv());
	}

	@Override
	protected IspitniRok convertToEntity(IspitniRokDTO dto) {

		return new IspitniRok(dto.getId(),dto.getNaziv(),dto.getDatumPocetka(),dto.getDatumZavrsetka(),dto.getVidljiv());
		}

	@Override
	protected void updateEntityFromDto(IspitniRokDTO dto, IspitniRok entity) {
		// TODO Auto-generated method stub
		
	}



}
