package server.DTOs;

import java.time.LocalDate;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class IspitniRokDTO {
	
	 	private Long id;

	    @Column(nullable = false)
	    private String naziv;

	    @Column(nullable = false)
	    private LocalDate datumPocetka;

	    @Column(nullable = false)
	    private LocalDate datumZavrsetka;
	    
	    private Boolean vidljiv;
}
