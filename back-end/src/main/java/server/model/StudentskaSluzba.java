package server.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "studentskaSluzba")
    private List<Biblioteka> biblioteke;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "studentskaSluzba")
	private List<Osoblje> Osoblje;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "studentskaSluzba")
	private List<Kalendar> kalendari;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "studentskaSluzba")
	private List<Student> studenti;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "studentskaSluzba")
	private List<SvObrazac> obrasci;

	@Column(nullable = false)
    private Boolean vidljiv = true;
	
    public StudentskaSluzba(Long id, Boolean vidljiv) {
        this.id = id;
        this.vidljiv = vidljiv;
    }
}
