package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PredmetDTO {

	private Long id;
	

	private Integer esbp;
	

	private Boolean obavezan;
	

	private Integer brojPredavanja;
	

	private Integer brojVezbi;
	

	private Boolean istrazivackiRad;
	

	private Integer brojSemestara;
	

	private String opis;
	

	private String cilj;
	

    private DokumentiPredmetaDTO dokumentiPredmeta;
    private List<RealizacijaPredmetaDTO> realizacijaPredmeta;
}
