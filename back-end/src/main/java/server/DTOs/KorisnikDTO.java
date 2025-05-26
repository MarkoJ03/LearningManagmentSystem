package server.DTOs;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KorisnikDTO {

	private Long id;
	private String email;

	private String lozinka;
	private Set<DodeljenoPravoPristupaDTO> dodeljenaPravaPristupa;

	private Boolean vidljiv = true;

}
