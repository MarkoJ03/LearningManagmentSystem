package server.DTOs;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.GrupaStudenata;
import server.model.IshodEvaluacije;
import server.model.SvObrazac;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentNaGodiniDTO {

	private Long id;
	private String brojIndeksa;
	private Date datumUpisa;
	private StudentDTO student;
	
	private GodinaStudijaDTO godinaStudija;
	
	private GrupaStudenataDTO grupaStudenata;
	
	private List<IshodEvaluacijeDTO> ishodEvaluacije;
	
	private SvObrazacDTO svObrazac;

	private Boolean vidljiv = true;
}
