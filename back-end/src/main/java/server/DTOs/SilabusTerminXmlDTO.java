package server.DTOs;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SilabusTerminXmlDTO {
    private LocalDate datum;
    private String materijal;
    private String cilj;
    private String opis;
    private String nastavnikImePrezime;
}
