package server.model;

import java.util.List;

import jakarta.persistence.CascadeType;
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
@AllArgsConstructor
@NoArgsConstructor
public class Katedra {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String naziv;

	@ManyToOne(optional = false)
	private Departman departman;

	@ManyToOne
    @JoinColumn(name = "sekretarKatedre_id", nullable = false)
	private Nastavnik sekretarKatedre;

	@ManyToOne
    @JoinColumn(name = "sefKatedre_id", nullable = false)
	private Nastavnik sefKatedre;

	@OneToMany(mappedBy = "katedra", cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
	private List<KatedraNastavnik> nastavnici;
	
	@OneToMany(mappedBy = "katedra", cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
	private List<StudijskiProgram> studijskiProgrami;

	@Column(nullable = false)
    private Boolean vidljiv = true;
}
