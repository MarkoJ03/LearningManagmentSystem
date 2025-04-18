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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluacijaZnanja {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Date vremePocetka;

	@Column(nullable = false)
	private Date vremeZavrsetka;

	@ManyToOne(optional = false)
	private Kalendar kalendar;

	@ManyToOne(optional = false)
	private Predmet predmet;

	@ManyToOne(optional = false)
	private Nastavnik nastavnik;

	@ManyToOne(optional = false)
	private TipEvaluacije tipEvaluacije;

	@OneToMany (fetch= FetchType.LAZY, mappedBy = "evaluacijaZnanja")
	private List<IshodEvaluacije> ishodEvaluacije;

	@Column(nullable = false)
    private Boolean vidljiv = true;

}
