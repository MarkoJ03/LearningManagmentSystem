package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.IshodPredmeta;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RealizacijaPredmetaDTO {
	private Long id;
	private NastavnikDTO nastavnik;
	private TipNastaveDTO tipNastave;
	private List<PredmetRealizacijePredmetaDTO> predmeti;
	private List<TerminNastaveDTO> terminiNastave;
	private IshodPredmetaDTO ishodPredmeta;
	private Boolean vidljiv = true;

}
