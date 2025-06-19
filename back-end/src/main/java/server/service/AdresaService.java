package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.AdresaDTO;
import server.model.Adresa;
import server.repository.AdresaRepository;

@Service
public class AdresaService extends BaseService<Adresa, AdresaDTO, Long>{


	@Autowired
	private AdresaRepository adresaRepository;
	
	@Autowired
	@Lazy
	private GradService gService;

  @Override
 protected CrudRepository<Adresa, Long> getRepository() {
      return adresaRepository;
  }

	@Override
	protected AdresaDTO convertToDTO(Adresa entity) {
		return new AdresaDTO(entity.getId(),gService.convertToDTO(entity.getGrad()),entity.getUlica(), entity.getBroj(),entity.getVidljiv());
	}

	@Override
	protected Adresa convertToEntity(AdresaDTO dto) {

		return new Adresa(dto.getId(),gService.convertToEntity(dto.getGrad()),dto.getUlica(), dto.getBroj(),dto.getVidljiv());
		}

	@Override
	protected void updateEntityFromDto(AdresaDTO dto, Adresa entity) {
		// TODO Auto-generated method stub
		
	}



}