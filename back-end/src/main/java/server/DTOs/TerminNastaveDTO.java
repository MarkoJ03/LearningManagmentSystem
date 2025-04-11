package server.DTOs;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TerminNastaveDTO {
	private Long id;
	private Date vremePocetka;
	private Date vremeKraja;
	private Integer brojCasova;
	private RealizacijaPredmetaDTO realizacijaPredmeta;
	private KalendarDTO kalendar;
	
	private Boolean vidljiv = true;
}
