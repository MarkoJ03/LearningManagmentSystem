package server.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentskaSluzba {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "studentskaSluzba")
	private List<Objava> objave;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "studentskaSluzba")
	private List<Inventar> inventari;
	
	@OneToOne(fetch = FetchType.LAZY, mappedBy = "studentskaSluzba")
    private Biblioteka biblioteka;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "studentskaSluzba")
	private List<Osoblje> Osoblje;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "studentskaSluzba")
	private List<Nastavnik> nastavnici;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "studentskaSluzba")
	private List<Kalendar> kalendari;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "studentskaSluzba")
	private List<Student> studenti;
	
	@Column(nullable = false)
    private Boolean vidljiv = true;
	
}
