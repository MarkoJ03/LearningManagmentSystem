package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class KnjigaDTO {


	    private Long id;

		private String naziv;

		private List<BibliotekaKnjigaDTO> bibliotekaKnjiga;


	    private Boolean vidljiv = true;
	}


