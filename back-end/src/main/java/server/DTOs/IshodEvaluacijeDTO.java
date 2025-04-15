package server.DTOs;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class IshodEvaluacijeDTO {

private Long id;
	
	private String napomena;
	
	private Integer bodovi;
	
	private StudentDTO student;
	
	private EvaluacijaZnanjaDTO evaluacijaZnanja;

    private Boolean vidljiv = true;
}
