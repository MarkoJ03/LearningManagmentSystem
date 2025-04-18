package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class KalendarDTO {


	    private Long id;


		private StudentskaSluzbaDTO studentsaSluzba;

		private List<EvaluacijaZnanjaDTO> evaluacijaZnanja;

		private List<GrupaStudenataDTO> grupaStudenata;

	    private Boolean vidljiv = true;
	}




