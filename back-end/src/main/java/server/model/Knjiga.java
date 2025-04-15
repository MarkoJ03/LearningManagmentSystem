package server.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Knjiga {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(nullable = false, unique = true)
	private String naziv;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "studentskaSluzba")
	private List<BibliotekaKnjiga> bibliotekaKnjiga;

	@Column(nullable = false)
    private Boolean vidljiv = true;
}
