package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor
@NoArgsConstructor
@Data
public class TipEvaluacijeDTO {

	private Long id;

	private String naziv;

	private List<EvaluacijaZnanjaDTO> evaluacijeZnanja;

    private Boolean vidljiv = true;
}
