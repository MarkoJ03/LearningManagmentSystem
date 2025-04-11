package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Boolean vidljiv = true;
}
