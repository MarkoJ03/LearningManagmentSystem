package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PredmetRealizacijePredmetaDTO {
	private Long id;
	private PredmetDTO predmet;
	private RealizacijaPredmetaDTO realizacijaPredmeta;
	private Boolean vidljiv;
}
