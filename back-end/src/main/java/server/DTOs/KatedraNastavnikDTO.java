package server.DTOs;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class KatedraNastavnikDTO {
	
	    private Long id;


	    private KatedraDTO katedra;


	    private NastavnikDTO nastavnik;
	    
	    private Boolean vidljiv = true;
}
