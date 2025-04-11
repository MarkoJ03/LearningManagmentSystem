package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KorisnikDTO {

	private Long id;
	private String email;
	private String korisnickoIme;
	private String lozinka;
	
	private Boolean vidljiv;
}
