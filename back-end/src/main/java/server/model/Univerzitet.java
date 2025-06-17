package server.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Univerzitet {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String naziv;

	@Column(nullable = false)
	private Date datumOsnivanja;

	@ManyToOne
	@JoinColumn(name = "adresa_id", nullable = false)
	private Adresa adresa;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "univerzitet", cascade = {CascadeType.ALL}, orphanRemoval = true)
	private List<Fakultet> fakulteti;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String kontakt;

	@Column(nullable = false)
    private Boolean vidljiv = true;
	

}
