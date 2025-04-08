package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.NastavnikDTO;
import server.DTOs.NaucnaOblastDTO;
import server.DTOs.TipZvanjaDTO;
import server.DTOs.ZvanjeDTO;
import server.model.Nastavnik;
import server.model.NaucnaOblast;
import server.model.TipZvanja;
import server.model.Zvanje;
import server.repository.ZvanjeRepository;

@Service
public class ZvanjeService extends BaseService<Zvanje, ZvanjeDTO, Long> {

	@Autowired
	private ZvanjeRepository zvanjeRepository;

	@Override
	protected CrudRepository<Zvanje, Long> getRepository() {
		return zvanjeRepository;
	}

	@Override
	protected ZvanjeDTO convertToDTO(Zvanje entity) {
		TipZvanjaDTO tipZvanja = new TipZvanjaDTO(entity.getTipZvanja().getId(), entity.getTipZvanja().getNaziv(),
				null);
		NaucnaOblastDTO naucnaOblast = new NaucnaOblastDTO(entity.getNaucnaOblast().getId(),
				entity.getNaucnaOblast().getNaziv(), null);
		NastavnikDTO nastavnik = new NastavnikDTO(entity.getNastavnik().getId(), entity.getNastavnik().getIme(),
				entity.getNastavnik().getPrezime(), entity.getNastavnik().getJmbg(), null, null, null, null, null);

		return new ZvanjeDTO(entity.getId(), entity.getDatumIzbora(), entity.getDatumPrestanka(), tipZvanja,
				naucnaOblast, nastavnik);
	}

	@Override
	protected Zvanje convertToEntity(ZvanjeDTO dto) {
		TipZvanja tipZvanja = new TipZvanja(dto.getTipZvanja().getId(), dto.getTipZvanja().getNaziv(),
				null);
		NaucnaOblast naucnaOblast = new NaucnaOblast(dto.getNaucnaOblast().getId(),
				dto.getNaucnaOblast().getNaziv(), null);
		Nastavnik nastavnik = new Nastavnik(dto.getNastavnik().getId(), null,dto.getNastavnik().getIme(),
				dto.getNastavnik().getPrezime(), dto.getNastavnik().getJmbg(), null, null, null, null);
		
		return new Zvanje(dto.getId(), dto.getDatumIzbora(), dto.getDatumPrestanka(), tipZvanja, naucnaOblast, nastavnik);
	}

}
