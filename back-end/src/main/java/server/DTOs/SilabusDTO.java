package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class SilabusDTO {
	private Long id;
	
	private List<SilabusTerminDTO> termini;
	
	private Boolean vidljiv;
}
