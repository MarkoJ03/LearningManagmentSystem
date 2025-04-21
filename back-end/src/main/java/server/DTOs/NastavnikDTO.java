package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NastavnikDTO {

	private Long id;

	private KorisnikDTO korisnik;
	
	private String ime;

	private String prezime;
	
	private String jmbg;
	
	private List<ZvanjeDTO> zvanja;
	
	
	private List<DepartmanNastavnikDTO> departmani;
	
	private List<KatedraNastavnikDTO> katedre;

	
	private List<RealizacijaPredmetaDTO> realizacijaPredmeta;
	
	private List<ObavestenjeDTO> obavestenja;
	private Boolean vidljiv = true;

}
