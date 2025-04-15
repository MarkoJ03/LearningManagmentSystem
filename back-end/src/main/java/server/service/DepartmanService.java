package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;


import server.DTOs.NastavnikDTO;

import server.DTOs.DepartmanDTO;
import server.DTOs.FakultetDTO;

import server.model.Nastavnik;

import server.model.Departman;
import server.model.Fakultet;
import server.repository.DepartmanRepository;


@Service
public class DepartmanService extends BaseService<Departman, DepartmanDTO, Long>{


	@Autowired
	private DepartmanRepository departmanRepository;
	
	@Autowired
	@Lazy
	private StudentService studentService;
	
  @Override
 protected CrudRepository<Departman, Long> getRepository() {
      return departmanRepository;
  }

	@Override
	protected DepartmanDTO convertToDTO(Departman entity) {

		return new DepartmanDTO(entity.getId(),entity.getNaziv()
				,new FakultetDTO(entity.getFakultet().getId(),entity.getFakultet().getNaziv(), null,null, null), 
				new NastavnikDTO(entity.getSekretarDepartmana().getId(),null, entity.getSekretarDepartmana().getIme(),entity.getSekretarDepartmana().getPrezime(),entity.getSekretarDepartmana().getJmbg(),null,null,null, null),
				new NastavnikDTO(entity.getDirektorDepartmana().getId(),null, entity.getDirektorDepartmana().getIme(),entity.getDirektorDepartmana().getPrezime(),entity.getDirektorDepartmana().getJmbg(),null,null,null, null),
						null, null);
	}

	@Override
	protected Departman convertToEntity(DepartmanDTO dto) {
		
		

		return new Departman(dto.getId(),dto.getNaziv()
				,new Fakultet(dto.getFakultet().getId(),dto.getFakultet().getNaziv(), null,null, null, null), 
				new Nastavnik(dto.getSekretarDepartmana().getId(),null, dto.getSekretarDepartmana().getIme(),dto.getSekretarDepartmana().getPrezime(),dto.getSekretarDepartmana().getJmbg(),null,null,null, null, null, null),
				new Nastavnik(dto.getDirektorDepartmana().getId(),null, dto.getDirektorDepartmana().getIme(),dto.getDirektorDepartmana().getPrezime(),dto.getDirektorDepartmana().getJmbg(),null,null,null, null, null, null),
						null, null);
		}



}