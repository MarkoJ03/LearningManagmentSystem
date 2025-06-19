package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ObavestenjeDTO {
	private Long id;
	private String naslov;
	private String sadrzaj;
	private NastavnikDTO nastavnik;
	private PredmetDTO predmet;
	private Boolean vidljiv = true;

}
