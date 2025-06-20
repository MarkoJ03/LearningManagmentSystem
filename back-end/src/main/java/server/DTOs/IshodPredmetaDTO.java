package server.DTOs;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class IshodPredmetaDTO {
	private Long id;
	private Integer ocena;
	private List<RealizacijaPredmetaDTO> realizacijePredmeta;
	private List<IshodEvaluacijeDTO> ishodiEvaluacije;
	private Boolean vidljiv = true;


}
