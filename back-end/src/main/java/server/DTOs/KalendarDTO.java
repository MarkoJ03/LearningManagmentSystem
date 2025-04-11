package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KalendarDTO {
	private Long id;
	private List<TerminNastaveDTO> terminiNastave;
	
	private Boolean vidljiv = true;
}
