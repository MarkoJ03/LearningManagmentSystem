package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TerminXmlDTO {

    private String datum;
    private String materijal;
    private String cilj;
    private String opis;
    private NastavnikXmlDTO nastavnik;
}