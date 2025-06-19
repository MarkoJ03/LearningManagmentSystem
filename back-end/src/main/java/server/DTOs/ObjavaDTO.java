package server.DTOs;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.StudentskaSluzba;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ObjavaDTO {



	    private Long id;

		private String naslov;

		private String sadrzaj;

		private StudentskaSluzbaDTO studentskaSluzba;

	    private Boolean vidljiv = true;

	}


