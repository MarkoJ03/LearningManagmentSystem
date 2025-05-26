package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.KatedraDTO;
import server.DTOs.KatedraNastavnikDTO;
import server.DTOs.NastavnikDTO;
import server.model.Katedra;
import server.model.KatedraNastavnik;
import server.model.Nastavnik;
import server.repository.KatedraNastavnikRepository;

@Service
public class KatedraNastavnikService extends BaseService<KatedraNastavnik, KatedraNastavnikDTO, Long>{


	@Autowired
	private KatedraNastavnikRepository katedraNastavnikRepository;

  @Override
 protected CrudRepository<KatedraNastavnik, Long> getRepository() {
      return katedraNastavnikRepository;
  }

	@Override
	protected KatedraNastavnikDTO convertToDTO(KatedraNastavnik entity) {


		return new KatedraNastavnikDTO(entity.getId(),new KatedraDTO(entity.getKatedra().getId(),entity.getKatedra().getNaziv(),null,null,null,null,null,entity.getKatedra().getVidljiv())
				,new NastavnikDTO(entity.getNastavnik().getId(),null,entity.getNastavnik().getIme(),entity.getNastavnik().getPrezime(),entity.getNastavnik().getJmbg(),null,null,null, null, null,null,null, entity.getNastavnik().getVidljiv()),entity.getVidljiv());

	}

	@Override
	protected KatedraNastavnik convertToEntity(KatedraNastavnikDTO dto) {
		// TODO Auto-generated method stub

return new KatedraNastavnik(dto.getId(),new Katedra(dto.getKatedra().getId(),dto.getKatedra().getNaziv(),null,null,null,null,null, dto.getKatedra().getVidljiv())
				,new Nastavnik(dto.getNastavnik().getId(),null, dto.getNastavnik().getIme(),dto.getNastavnik().getPrezime(),dto.getNastavnik().getJmbg(),null,null,null, null,null,null,null,dto.getNastavnik().getVidljiv()),dto.getVidljiv());

		}



}