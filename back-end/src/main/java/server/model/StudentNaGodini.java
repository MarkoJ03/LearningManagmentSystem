package server.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentNaGodini {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String brojIndeksa;

	@Column(nullable = false)
	private Date datumUpisa;

	@ManyToOne(optional = false)
	private Student student;

	@ManyToOne(optional = false)
	private GodinaStudija godinaStudija;


	@ManyToOne(optional = false)
	private GrupaStudenata grupaStudenata;

	@Column(nullable = false)
    private Boolean vidljiv = true;



}
