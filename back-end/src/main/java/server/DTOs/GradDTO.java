package server.DTOs;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GradDTO {

	private Long id;
	

	private String naziv;
	

	private DrzavaDTO drzava;
	
	private Boolean vidljiv;

}
