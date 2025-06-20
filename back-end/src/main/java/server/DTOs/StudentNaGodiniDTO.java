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
	
	public StudentNaGodiniDTO(Long id, String brojIndeksa, Date datumUpisa, StudentDTO student,
            GodinaStudijaDTO godinaStudija, GrupaStudenataDTO grupaStudenata,
            List<IshodEvaluacijeDTO> ishodEvaluacije, SvObrazacDTO svObrazac,
            Boolean vidljiv) {
					    this.id = id;
						this.brojIndeksa = brojIndeksa;
						this.datumUpisa = datumUpisa;
						this.student = student;
						this.godinaStudija = godinaStudija;
						this.grupaStudenata = grupaStudenata;
						this.ishodEvaluacije = ishodEvaluacije;
						this.svObrazac = svObrazac;
						this.vidljiv = vidljiv;
}


}
