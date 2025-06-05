package server.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudijskiProgram {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(nullable = false)
	private String naziv;

	@ManyToOne(optional = true)
	private TipPrograma tipPrograma;

	@ManyToOne(optional = true)
	private Katedra katedra;

	@OneToMany(mappedBy = "studijskiProgram")
	private List<GodinaStudija> godineStudija;


	@Column(nullable = false)
    private Boolean vidljiv = true;
}
