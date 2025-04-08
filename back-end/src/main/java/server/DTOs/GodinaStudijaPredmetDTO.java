package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GodinaStudijaPredmetDTO {
	private GodinaStudijaDTO godinaStudija;
	private PredmetDTO predmet;
}
