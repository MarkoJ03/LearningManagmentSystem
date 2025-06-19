package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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
import server.repository.NastavnikRepository;
import server.repository.NaucnaOblastRepository;
import server.repository.TipZvanjaRepository;
import server.repository.ZvanjeRepository;

@Service
public class ZvanjeService extends BaseService<Zvanje, ZvanjeDTO, Long> {

	@Autowired
	private ZvanjeRepository zvanjeRepository;
	@Autowired
	private TipZvanjaRepository tipZvanjaRepository;
	@Autowired
	private NaucnaOblastRepository naucnaOblastRepository;
	@Autowired
	private NastavnikRepository nastavnikRepository;
	@Autowired 
	@Lazy 
	private TipZvanjaService tipZvanjaService;
    @Autowired 
    @Lazy 
    private NaucnaOblastService naucnaOblastService;
    @Autowired 
    @Lazy 
    private NastavnikService nastavnikService;

	@Override
	protected CrudRepository<Zvanje, Long> getRepository() {
		return zvanjeRepository;
	}

	@Override
	protected ZvanjeDTO convertToDTO(Zvanje entity) {
	    TipZvanjaDTO tipZvanjaDTO = null;
	    if (entity.getTipZvanja() != null) {
	        tipZvanjaDTO = new TipZvanjaDTO(entity.getTipZvanja().getId(), entity.getTipZvanja().getNaziv(), null, entity.getTipZvanja().getVidljiv());
	    }

	    NaucnaOblastDTO naucnaOblastDTO = null;
	    if (entity.getNaucnaOblast() != null) {
	        naucnaOblastDTO = new NaucnaOblastDTO(entity.getNaucnaOblast().getId(), entity.getNaucnaOblast().getNaziv(), null, entity.getNaucnaOblast().getVidljiv());
	    }

	    NastavnikDTO nastavnikDTO = null;
	    if (entity.getNastavnik() != null) {
	        nastavnikDTO = new NastavnikDTO(
	            entity.getNastavnik().getId(),
	            null, 
	            entity.getNastavnik().getIme(),
	            entity.getNastavnik().getPrezime(),
	            entity.getNastavnik().getJmbg(),
	            null, null, null,null, null, null, 
	            entity.getNastavnik().getVidljiv()
	        );
	    }

	    return new ZvanjeDTO(entity.getId(), entity.getDatumIzbora(), entity.getDatumPrestanka(), tipZvanjaDTO,
	            naucnaOblastDTO, nastavnikDTO, entity.getVidljiv());
	}

	@Override
	protected Zvanje convertToEntity(ZvanjeDTO dto) {
		var entity = new Zvanje();
		entity.setId(dto.getId());
		entity.setDatumIzbora(dto.getDatumIzbora());
		entity.setDatumPrestanka(dto.getDatumPrestanka());

		TipZvanja tipZvanja = null;
		if (dto.getTipZvanja() != null && dto.getTipZvanja().getId() != null) {
			tipZvanja = tipZvanjaRepository.findById(dto.getTipZvanja().getId())
					.orElseThrow(() -> new IllegalArgumentException("TipZvanja sa ID " + dto.getTipZvanja().getId() + " ne postoji."));
		} else {
			throw new IllegalArgumentException("TipZvanja je obavezno polje za Zvanje.");
		}
		entity.setTipZvanja(tipZvanja);

		NaucnaOblast naucnaOblast = null;
		if (dto.getNaucnaOblast() != null && dto.getNaucnaOblast().getId() != null) {
			naucnaOblast = naucnaOblastRepository.findById(dto.getNaucnaOblast().getId())
					.orElseThrow(() -> new IllegalArgumentException("NaucnaOblast sa ID " + dto.getNaucnaOblast().getId() + " ne postoji."));
		} else {
			throw new IllegalArgumentException("NaucnaOblast je obavezno polje za Zvanje.");
		}
		entity.setNaucnaOblast(naucnaOblast);

		Nastavnik nastavnik = null;
		if (dto.getNastavnik() != null && dto.getNastavnik().getId() != null) {
			nastavnik = nastavnikRepository.findById(dto.getNastavnik().getId())
					.orElseThrow(() -> new IllegalArgumentException("Nastavnik sa ID " + dto.getNastavnik().getId() + " ne postoji."));
		} else {
			throw new IllegalArgumentException("Nastavnik je obavezno polje za Zvanje.");
		}
		entity.setNastavnik(nastavnik);

		entity.setVidljiv(dto.getVidljiv());

		return entity;
	}

	@Override
	protected void updateEntityFromDto(ZvanjeDTO dto, Zvanje entity) {
		if (dto.getDatumIzbora() != null) {
			entity.setDatumIzbora(dto.getDatumIzbora());
		}
		if (dto.getDatumPrestanka() != null) {
			entity.setDatumPrestanka(dto.getDatumPrestanka());
		}
		if (dto.getVidljiv() != null) {
			entity.setVidljiv(dto.getVidljiv());
		}

		if (dto.getTipZvanja() != null && dto.getTipZvanja().getId() != null) {
			TipZvanja tipZvanja = tipZvanjaRepository.findById(dto.getTipZvanja().getId())
					.orElseThrow(() -> new IllegalArgumentException("TipZvanja sa ID " + dto.getTipZvanja().getId() + " ne postoji."));
			entity.setTipZvanja(tipZvanja);
		} else {
			throw new IllegalArgumentException("TipZvanja je obavezno polje za Zvanje.");
		}

		if (dto.getNaucnaOblast() != null && dto.getNaucnaOblast().getId() != null) {
			NaucnaOblast naucnaOblast = naucnaOblastRepository.findById(dto.getNaucnaOblast().getId())
					.orElseThrow(() -> new IllegalArgumentException("NaucnaOblast sa ID " + dto.getNaucnaOblast().getId() + " ne postoji."));
			entity.setNaucnaOblast(naucnaOblast);
		} else {
			throw new IllegalArgumentException("NaucnaOblast je obavezno polje za Zvanje.");
		}

		if (dto.getNastavnik() != null && dto.getNastavnik().getId() != null) {
			Nastavnik nastavnik = nastavnikRepository.findById(dto.getNastavnik().getId())
					.orElseThrow(() -> new IllegalArgumentException("Nastavnik sa ID " + dto.getNastavnik().getId() + " ne postoji."));
			entity.setNastavnik(nastavnik);
		} else {
			throw new IllegalArgumentException("Nastavnik je obavezno polje za Zvanje.");
		}
	}

	

}
