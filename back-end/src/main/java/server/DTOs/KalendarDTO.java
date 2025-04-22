package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.TerminNastave;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class KalendarDTO {


	    private Long id;


		private StudentskaSluzbaDTO studentsaSluzba;

		private List<EvaluacijaZnanjaDTO> evaluacijaZnanja;

		private List<GrupaStudenataDTO> grupaStudenata;
		
		private List<TerminNastaveDTO> terminiNastave;

	    private Boolean vidljiv = true;
	}




