package server.DTOs;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ZvanjeDTO {
	
	private Long id;
	
	private Date datumIzbora;

	private Date datumPrestanka;
	

	private TipZvanjaDTO tipZvanja;
	

	private NaucnaOblastDTO naucnaOblast;
	

	private NastavnikDTO nastavnik;
	
	private Boolean vidljiv = true;
}
