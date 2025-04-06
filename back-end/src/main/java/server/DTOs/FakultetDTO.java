package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class FakultetDTO {
	
	private Long id;
	private String naziv;
	private UniverzitetDTO univerzitet;
	
	private List<DepartmanDTO> departmani;
	
}
