package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentXmlDTO {
    private String ime;
    private String prezime;
    private String jmbg;
    private AdresaXmlDTO adresa;
}
