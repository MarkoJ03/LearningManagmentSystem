package server.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class RealizacijaPredmeta {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	private Nastavnik nastavnik;
	@ManyToOne
	private TipNastave tipNastave;
	@ManyToOne
	private Predmet predmet;
	@OneToMany(mappedBy = "realizacijaPredmeta")
	private List<TerminNastave> terminiNastave;
	@OneToMany(mappedBy = "realizacijaPredmeta")
	private List<IshodPredmeta> ishodiPredmeta;
	
    @Column(nullable = false)
    private Boolean vidljiv = true;
}
