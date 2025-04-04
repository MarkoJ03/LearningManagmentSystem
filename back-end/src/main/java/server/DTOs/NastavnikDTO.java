package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.DepartmanNastavnik;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NastavnikDTO {

	private Integer id;

	private String ime;

	private String jmbg;
	
	private List<ZvanjeDTO> zvanja;
	
	private KorisnikDTO korisnik;
	
	private List<DepartmanNastavnikDTO> departmani;
}
