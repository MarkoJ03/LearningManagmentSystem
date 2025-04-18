package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.DepartmanNastavnikDTO;
import server.DTOs.KatedraNastavnikDTO;
import server.DTOs.KorisnikDTO;
import server.DTOs.NastavnikDTO;
import server.DTOs.ObavestenjeDTO;
import server.DTOs.RealizacijaPredmetaDTO;
import server.DTOs.ZvanjeDTO;
import server.model.DepartmanNastavnik;
import server.model.KatedraNastavnik;
import server.model.Korisnik;
import server.model.Nastavnik;
import server.model.Obavestenje;
import server.model.RealizacijaPredmeta;
import server.model.Zvanje;
import server.repository.NastavnikRepository;

@Service
public class NastavnikService extends BaseService<Nastavnik, NastavnikDTO, Long> {

	@Autowired
	private NastavnikRepository nastavnikRepository;

	@Autowired
	@Lazy
	private ZvanjeService zvanjeService;

	@Autowired
	@Lazy
	private DepartmanNastavnikService departmanNastavnikService;

	@Autowired
	@Lazy
	private KatedraNastavnikService katedraNastavnikService;

	@Autowired
	@Lazy
	private RealizacijaPredmetaService realizacijaPredmetaService;

	@Autowired
	@Lazy
	private ObavestenjeService obavestenjeService;

	@Override
	protected CrudRepository<Nastavnik, Long> getRepository() {
		return nastavnikRepository;
	}

	@Override
	protected NastavnikDTO convertToDTO(Nastavnik entity) {
		KorisnikDTO korisnik = new KorisnikDTO(entity.getKorisnik().getId(), entity.getKorisnik().getEmail(),
				entity.getKorisnik().getKorisnickoIme(), entity.getKorisnik().getLozinka(), entity.getKorisnik().getVidljiv());

		ArrayList<ZvanjeDTO> zvanja = new ArrayList<>();
		for (Zvanje z : entity.getZvanja()) {
			ZvanjeDTO zDTO = zvanjeService.convertToDTO(z);
			zvanja.add(zDTO);
		}

		ArrayList<DepartmanNastavnikDTO> departmaniNastavnici = new ArrayList<>();
		for (DepartmanNastavnik dn : entity.getDepartmani()) {
			DepartmanNastavnikDTO dnDTO = departmanNastavnikService.convertToDTO(dn);
			departmaniNastavnici.add(dnDTO);
		}

		ArrayList<KatedraNastavnikDTO> katedreNastavnici = new ArrayList<>();
		for (KatedraNastavnik dn : entity.getKatedre()) {
			KatedraNastavnikDTO dnDTO = katedraNastavnikService.convertToDTO(dn);
			katedreNastavnici.add(dnDTO);
		}

		ArrayList<RealizacijaPredmetaDTO> realizacijePredmeta = new ArrayList<>();
		for (RealizacijaPredmeta rp : entity.getRealizacijePredmeta()) {
			RealizacijaPredmetaDTO rpDTO = realizacijaPredmetaService.convertToDTO(rp);
			realizacijePredmeta.add(rpDTO);
		}

		ArrayList<ObavestenjeDTO> obavestenja = new ArrayList<>();
		for (Obavestenje o : entity.getObavestenja()) {
			ObavestenjeDTO oDTO = obavestenjeService.convertToDTO(o);
			obavestenja.add(oDTO);
		}

		return new NastavnikDTO(entity.getId(), entity.getIme(), entity.getPrezime(), entity.getJmbg(), zvanja,
				korisnik, departmaniNastavnici, katedreNastavnici, realizacijePredmeta, obavestenja, entity.getVidljiv());
	}

	@Override
	protected Nastavnik convertToEntity(NastavnikDTO dto) {
		Korisnik korisnik = new Korisnik(dto.getKorisnik().getId(), dto.getKorisnik().getEmail(),
				dto.getKorisnik().getKorisnickoIme(), dto.getKorisnik().getLozinka(), dto.getKorisnik().getVidljiv());

		ArrayList<Zvanje> zvanja = new ArrayList<>();
		for (ZvanjeDTO zDTO : dto.getZvanja()) {
			Zvanje z = zvanjeService.convertToEntity(zDTO);
			zvanja.add(z);
		}

		ArrayList<DepartmanNastavnik> departmaniNastavnici = new ArrayList<>();
		for (DepartmanNastavnikDTO dnDTO : dto.getDepartmani()) {
			DepartmanNastavnik dn = departmanNastavnikService.convertToEntity(dnDTO);
			departmaniNastavnici.add(dn);
		}

		ArrayList<KatedraNastavnik> katedreNastavnici = new ArrayList<>();
		for (KatedraNastavnikDTO dn : dto.getKatedre()) {
			KatedraNastavnik dnDTO = katedraNastavnikService.convertToEntity(dn);
			katedreNastavnici.add(dnDTO);
		}

		ArrayList<RealizacijaPredmeta> realizacijePredmeta = new ArrayList<>();
		for (RealizacijaPredmetaDTO rpDTO : dto.getRealizacijaPredmeta()) {
			RealizacijaPredmeta rp = realizacijaPredmetaService.convertToEntity(rpDTO);
			realizacijePredmeta.add(rp);
		}

		ArrayList<Obavestenje> obavestenja = new ArrayList<>();
		for (ObavestenjeDTO oDTO : dto.getObavestenja()) {
			Obavestenje o = obavestenjeService.convertToEntity(oDTO);
			obavestenja.add(o);
		}

		return new Nastavnik(dto.getId(), korisnik, dto.getIme(), dto.getPrezime(), dto.getJmbg(),
				zvanja, departmaniNastavnici, katedreNastavnici, realizacijePredmeta, obavestenja, dto.getVidljiv());
	}

}
