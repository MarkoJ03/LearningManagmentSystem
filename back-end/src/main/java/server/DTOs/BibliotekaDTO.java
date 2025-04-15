package server.DTOs;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.BibliotekaKnjiga;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BibliotekaDTO {


    private Long id;
	
	private List<BibliotekaKnjigaDTO> bibliotekaKnjiga;
	
	
    private Boolean vidljiv = true;
	}


