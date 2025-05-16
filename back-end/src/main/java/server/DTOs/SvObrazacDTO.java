package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.StudentskaSluzba;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SvObrazacDTO {
	private Long id;
	
	private String maternjiJezik;
	
	private String vrstaZavreseneSrednje;
	
	
	private String datumZavrsetkaSrednje;
	
	private Boolean bracniStatus;
	
	private String kontakt;
	
	private Boolean zaposlen;
	
	private Boolean nacinFinansiranja;
	
	private StudentNaGodiniDTO studentNaGodini;
	
	private StudentskaSluzbaDTO studentskaSluzba;
	
	private Boolean vidljiv;
}
