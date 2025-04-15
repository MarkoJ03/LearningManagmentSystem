package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudijskiProgramDTO {

    private Long id;
	
    private String naziv;
	

	private TipProgramaDTO tipPrograma;
	

	private KatedraDTO katedra;
	

	private List<GodinaStudijaDTO> godineStudija;
	
	private Boolean vidljiv = true;
}

