package server.model;


import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SvObrazac {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String maternjiJezik;
	
	private String vrstaZavreseneSrednje;
	
	
	private String datumZavrsetkaSrednje;
	
	private Boolean bracniStatus;
	
	private String kontakt;
	
	private Boolean zaposlen;
	
	private Boolean nacinFinansiranja;
	
	
	@OneToOne(optional = true)
	private StudentNaGodini studentNaGodini;
	
	@ManyToOne
	private StudentskaSluzba studentskaSluzba;
	
	private Boolean vidljiv;
}
