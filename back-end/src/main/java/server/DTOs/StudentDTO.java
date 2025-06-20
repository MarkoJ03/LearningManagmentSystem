package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.StudentNaGodini;
import server.model.StudentskaSluzba;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {

    private Long id;


    private KorisnikDTO korisnik;


    private String ime;


    private String prezime;


    private String jmbg;

    private AdresaDTO adresa;
    
	private StudentskaSluzbaDTO studentskaSluzba;
	
	 private List<StudentNaGodiniDTO> studentiNaGodini;

    private Boolean vidljiv = true;
}
