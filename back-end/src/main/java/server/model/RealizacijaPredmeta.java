package server.model;

import java.util.List;

import jakarta.persistence.CascadeType;
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
public class RealizacijaPredmeta {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	private Nastavnik nastavnik;
	@ManyToOne
	private TipNastave tipNastave;
	@OneToMany(fetch= FetchType.LAZY, mappedBy = "realizacijaPredmeta", cascade = {CascadeType.ALL}, orphanRemoval = true)
	private List<PredmetRealizacijePredmeta> predmeti;
	@OneToMany(mappedBy = "realizacijaPredmeta", cascade = {CascadeType.ALL}, orphanRemoval = true)
	private List<TerminNastave> terminiNastave;
	@ManyToOne(optional = true)
	private IshodPredmeta ishodPredmeta;
    @Column(nullable = false)
    private Boolean vidljiv = true;
}
