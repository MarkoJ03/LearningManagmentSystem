package server.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SilabusTermin {
		
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate datum;
    private String materijal;
    private String cilj;
    private String opis;
    @ManyToOne
    @JoinColumn(name = "nastavnik_id", nullable = false) 
    private Nastavnik nastavnik;


    @ManyToOne
    @JoinColumn(name = "silabus_id", nullable = false)
    private Silabus silabus;
    
    private Boolean vidljiv;
}
