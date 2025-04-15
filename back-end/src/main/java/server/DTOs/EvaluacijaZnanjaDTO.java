package server.DTOs;

import java.util.Date;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class EvaluacijaZnanjaDTO {

	private Long id;
	
	
	private Date vremePocetka;
	
	
	private Date vremeZavrsetka;
	
	
	private KalendarDTO kalendar;
	
	
	private PredmetDTO predmet;
	
	
	private NastavnikDTO nastavnik;
	
	
	private TipEvaluacijeDTO tipEvaluacije;
	
	
	private List<IshodEvaluacijeDTO> ishodEvaluacije;
	
	
    private Boolean vidljiv = true;
}
