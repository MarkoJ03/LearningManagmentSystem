package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.Biblioteka;
import server.model.Knjiga;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BibliotekaKnjigaDTO {

	

	

		private BibliotekaDTO biblioteka;
		
	
		private KnjigaDTO knjiga;
		
		
	    private Boolean vidljiv = true;
	}


