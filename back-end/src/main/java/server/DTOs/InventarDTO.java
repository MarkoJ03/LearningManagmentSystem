package server.DTOs;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Data
public class InventarDTO {


		private Long id;


		private StudentskaSluzbaDTO studentskaSluzba;


	    private Boolean vidljiv = true;
	    
	    
	    public InventarDTO(Long id, StudentskaSluzbaDTO studentsaSluzba, Boolean vidljiv) {
	        this.id = id;
	        this.studentskaSluzba = studentsaSluzba;
	        this.vidljiv = vidljiv;
	    }
	}


