package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BibliotekaKnjigaDTO {



		private Long id;

		private BibliotekaDTO biblioteka;


		private KnjigaDTO knjiga;


	    private Boolean vidljiv = true;
	}


