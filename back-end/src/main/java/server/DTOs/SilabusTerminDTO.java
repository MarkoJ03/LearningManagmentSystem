package server.DTOs;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class SilabusTerminDTO {
    private Long id;

    private LocalDate datum;
    private String materijal;
    private String cilj;
    private String opis;
    private NastavnikDTO nastavnik;

    
    private SilabusDTO silabus;
    
    private Boolean vidljiv;
}
