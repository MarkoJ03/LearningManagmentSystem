package server.DTOs;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TipProgramaDTO {


    private Long id;


	private String naziv;


	private List<StudijskiProgramDTO> programi;
<<<<<<< HEAD

	private Boolean vidljiv = true;

=======
	private Boolean vidljiv = true;
>>>>>>> development
}
