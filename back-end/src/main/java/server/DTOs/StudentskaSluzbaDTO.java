package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentskaSluzbaDTO {



		private Long id;

		private List<ObjavaDTO> objave;

		private List<InventarDTO> inventari;

	    private BibliotekaDTO biblioteka;

		private List<OsobljeDTO> Osoblje;

		private List<NastavnikDTO> nastavnici;

		private List<KalendarDTO> kalendari;

		private List<StudentDTO> studenti;
		
		private List<SvObrazacDTO> obrasci;

	    private Boolean vidljiv = true;

	}




