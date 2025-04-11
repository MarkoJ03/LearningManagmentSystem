package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RealizacijaPredmetaDTO {
	private Long id;
	private NastavnikDTO nastavnik;
	private TipNastaveDTO tipNastave;
	private PredmetDTO predmet;
	private List<TerminNastaveDTO> terminiNastave;
	private List<IshodPredmetaDTO> ishodiPredmeta;
	private Boolean vidljiv = true;
}
