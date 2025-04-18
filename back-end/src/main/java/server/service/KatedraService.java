package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;


import server.DTOs.NastavnikDTO;

import server.DTOs.KatedraDTO;
import server.DTOs.DepartmanDTO;

import server.model.Nastavnik;

import server.model.Katedra;
import server.model.Departman;
import server.repository.KatedraRepository;


@Service
public class KatedraService extends BaseService<Katedra, KatedraDTO, Long>{


	@Autowired
	private KatedraRepository katedraRepository;


  @Override
 protected CrudRepository<Katedra, Long> getRepository() {
      return katedraRepository;
  }


	@Override
	protected KatedraDTO convertToDTO(Katedra entity) {

		return new KatedraDTO(entity.getId(),entity.getNaziv()
<<<<<<< HEAD
				,new DepartmanDTO(entity.getDepartman().getId(),entity.getDepartman().getNaziv(), null,null,null,null, null),
				new NastavnikDTO(entity.getSekretarKatedre().getId(),null, entity.getSekretarKatedre().getIme(),entity.getSekretarKatedre().getPrezime(),entity.getSekretarKatedre().getJmbg(),null,null,null, null),
				new NastavnikDTO(entity.getSefKatedre().getId(),null, entity.getSefKatedre().getIme(),entity.getSefKatedre().getPrezime(),entity.getSefKatedre().getJmbg(),null,null,null, null),
						null, null);
=======
				,new DepartmanDTO(entity.getDepartman().getId(),entity.getDepartman().getNaziv(), null,null,null,null, entity.getDepartman().getVidljiv()),
				new NastavnikDTO(entity.getSekretarKatedre().getId(), entity.getSekretarKatedre().getIme(),entity.getSekretarKatedre().getPrezime(),entity.getSekretarKatedre().getJmbg(),null,null,null, null, null,null, entity.getSekretarKatedre().getVidljiv()),
				new NastavnikDTO(entity.getSefKatedre().getId(), entity.getSefKatedre().getIme(),entity.getSefKatedre().getPrezime(),entity.getSefKatedre().getJmbg(),null,null,null, null, null,null,entity.getSefKatedre().getVidljiv()),
						null,entity.getVidljiv());
>>>>>>> development
	}

	@Override
	protected Katedra convertToEntity(KatedraDTO dto) {



		return new Katedra(dto.getId(),dto.getNaziv()
<<<<<<< HEAD
				,new Departman(dto.getDepartman().getId(),dto.getDepartman().getNaziv(), null,null,null,null, null),
				new Nastavnik(dto.getSekretarKatedre().getId(),null, dto.getSekretarKatedre().getIme(),dto.getSekretarKatedre().getPrezime(),dto.getSekretarKatedre().getJmbg(),null,null,null, null, null, null),
				new Nastavnik(dto.getSefKatedre().getId(),null, dto.getSefKatedre().getIme(),dto.getSefKatedre().getPrezime(),dto.getSefKatedre().getJmbg(),null,null,null, null, null, null),
						null, null);
=======
				,new Departman(dto.getDepartman().getId(),dto.getDepartman().getNaziv(), null,null,null,null,dto.getDepartman().getVidljiv()),
				new Nastavnik(dto.getSekretarKatedre().getId(),null, dto.getSekretarKatedre().getIme(),dto.getSekretarKatedre().getPrezime(),dto.getSekretarKatedre().getJmbg(),null,null,null, null,null,dto.getSefKatedre().getVidljiv()),
				new Nastavnik(dto.getSefKatedre().getId(),null, dto.getSefKatedre().getIme(),dto.getSefKatedre().getPrezime(),dto.getSefKatedre().getJmbg(),null,null,null, null,null,dto.getSekretarKatedre().getVidljiv()),
						null,dto.getVidljiv());
>>>>>>> development
		}



}