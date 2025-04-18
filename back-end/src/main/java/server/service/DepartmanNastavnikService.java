package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.DepartmanDTO;
import server.DTOs.DepartmanNastavnikDTO;
import server.DTOs.NastavnikDTO;
import server.model.Departman;
import server.model.DepartmanNastavnik;
import server.model.Nastavnik;
import server.repository.DepartmanNastavnikRepository;

@Service
public class DepartmanNastavnikService extends BaseService<DepartmanNastavnik, DepartmanNastavnikDTO, Long>{


	@Autowired
	private DepartmanNastavnikRepository departmanNastavnikRepository;

  @Override
 protected CrudRepository<DepartmanNastavnik, Long> getRepository() {
      return departmanNastavnikRepository;
  }

	@Override
	protected DepartmanNastavnikDTO convertToDTO(DepartmanNastavnik entity) {
		return new DepartmanNastavnikDTO(entity.getId(),new DepartmanDTO(entity.getDepartman().getId(),entity.getDepartman().getNaziv(),null,null,null,null,entity.getDepartman().getVidljiv())
				,new NastavnikDTO(entity.getNastavnik().getId(),entity.getNastavnik().getIme(),entity.getNastavnik().getPrezime(),entity.getNastavnik().getJmbg(),null,null,null,null,null,null,entity.getNastavnik().getVidljiv()),entity.getVidljiv());
	}

	@Override
	protected DepartmanNastavnik convertToEntity(DepartmanNastavnikDTO dto) {
<<<<<<< HEAD
=======
		// TODO Auto-generated method stub
>>>>>>> development
		return new DepartmanNastavnik(dto.getId(),new Departman(dto.getDepartman().getId(),dto.getDepartman().getNaziv(),null,null,null,null,dto.getDepartman().getVidljiv())
				,new Nastavnik(dto.getNastavnik().getId(),null,dto.getNastavnik().getIme(),dto.getNastavnik().getPrezime(),dto.getNastavnik().getJmbg(),null,null,null,null,null, dto.getNastavnik().getVidljiv()),dto.getVidljiv());
		}



}