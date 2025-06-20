package server.DTOs;
	
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.StudentskaSluzba;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BibliotekaDTO {


    private Long id;

    private List<BibliotekaKnjigaDTO> knjige;

	private StudentskaSluzbaDTO studentskaSluzba;

    private Boolean vidljiv = true;

	}


