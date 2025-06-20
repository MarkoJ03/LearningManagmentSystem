package server.DTOs;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UniverzitetDTO {

	private Long id;
	private String naziv;
	private Date datumOsnivanja;
	private AdresaDTO adresa;
	private List<FakultetDTO> fakulteti;
	
	private String email;
	private String kontakt;

	private Boolean vidljiv = true;
}
