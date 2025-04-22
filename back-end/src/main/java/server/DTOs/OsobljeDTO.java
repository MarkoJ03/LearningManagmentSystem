package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.Korisnik;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OsobljeDTO {

	 	private Long id;

	    private Korisnik korisnik;

		private String ime;

		private String prezime;

		private String jmbg;

		private StudentskaSluzbaDTO studentsaSluzba;

	    private Boolean vidljiv = true;
	}



