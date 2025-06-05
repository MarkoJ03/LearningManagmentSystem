package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrzavaDTO {

	private Long id;
	

	private String naziv;
	

	private List<GradDTO> gradovi;
	
	private Boolean vidljiv;

}
