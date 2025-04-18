package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.InventarDTO;
import server.model.Inventar;
import server.repository.InventarRepository;

@Service
public class InventarService extends BaseService<Inventar, InventarDTO, Long>{





	@Autowired
		private InventarRepository inventarRepository;

	  @Override
	 protected CrudRepository<Inventar, Long> getRepository() {
	      return inventarRepository;
	  }

	@Override
	protected InventarDTO convertToDTO(Inventar entity) {

		return null;
	}

	@Override
	protected Inventar convertToEntity(InventarDTO dto) {

		return null;
	}
}
