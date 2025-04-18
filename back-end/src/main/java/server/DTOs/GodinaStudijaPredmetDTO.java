package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GodinaStudijaPredmetDTO {
	 private Long id;
	private GodinaStudijaDTO godinaStudija;
	private PredmetDTO predmet;
	private Boolean vidljiv = true;
}
