package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DepartmanNastavnikDTO {
	
    private Long id;


    private DepartmanDTO departman;


    private NastavnikDTO nastavnik;
}
