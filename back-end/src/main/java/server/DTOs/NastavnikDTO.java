package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor
@NoArgsConstructor
@Data
public class NastavnikDTO {

	public NastavnikDTO(Long id2, String ime2, String prezime2, String jmbg2, Object object, Object object2,
			Object object3, Object object4, Object object5, Object object6, Boolean vidljiv2) {
		// TODO Auto-generated constructor stub
	}

	private Long id;

	private KorisnikDTO korisnik;
	
	private String ime;

	private String prezime;

	private String jmbg;

	private List<ZvanjeDTO> zvanja;

	private List<DepartmanNastavnikDTO> departmani;

	private List<KatedraNastavnikDTO> katedre;
	
	private StudentskaSluzbaDTO studentskaSluzba;

	private List<RealizacijaPredmetaDTO> realizacijePredmeta;

	private List<ObavestenjeDTO> obavestenja;
	
	private List<EvaluacijaZnanjaDTO> evaluacijeZnanja;

	private Boolean vidljiv = true;
}
