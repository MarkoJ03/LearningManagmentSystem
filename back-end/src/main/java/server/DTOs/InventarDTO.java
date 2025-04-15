package server.DTOs;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.StudentskaSluzba;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InventarDTO {

	
		private Long id;
		
		
		private StudentskaSluzbaDTO studentsaSluzba;
		
		
	    private Boolean vidljiv = true;
	}


