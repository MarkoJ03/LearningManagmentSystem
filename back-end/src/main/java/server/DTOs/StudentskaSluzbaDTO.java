package server.DTOs;

import java.util.List;

import com.fasterxml.jackson.databind.util.ClassUtil.Ctor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.Biblioteka;
import server.model.Inventar;
import server.model.Kalendar;
import server.model.Nastavnik;
import server.model.Objava;
import server.model.Osoblje;
import server.model.Student;
import server.model.SvObrazac;


@Data
@AllArgsConstructor

@NoArgsConstructor
public class StudentskaSluzbaDTO {



		private Long id;

		private List<ObjavaDTO> objave;

		private List<InventarDTO> inventari;

		private List<BibliotekaDTO> biblioteke;

		private List<OsobljeDTO> Osoblje;

		private List<KalendarDTO> kalendari;

		private List<StudentDTO> studenti;
		
		private List<SvObrazacDTO> obrasci;

	    private Boolean vidljiv = true;
	    
	    
	    public StudentskaSluzbaDTO(Long id, Boolean vidljiv) {
	        this.id = id;
	        this.vidljiv = vidljiv;
	    }

	}




