package server.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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

	@ManyToOne(optional = true)
	private GodinaStudija godinaStudija;


	@ManyToOne(optional = true)
	private GrupaStudenata grupaStudenata;
	
    @OneToMany (fetch= FetchType.LAZY, mappedBy = "studentNaGodini")
	private List<IshodEvaluacije> ishodEvaluacije;
    
    @OneToOne(mappedBy = "studentNaGodini", optional = true)
    private SvObrazac svObrazac;

    
    
	@Column(nullable = false)
    private Boolean vidljiv = true;



}
