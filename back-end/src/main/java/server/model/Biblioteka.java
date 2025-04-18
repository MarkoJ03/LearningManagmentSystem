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
public class Biblioteka {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "biblioteka")
	private List<BibliotekaKnjiga> bibliotekaKnjiga;

	@OneToOne
	private StudentskaSluzba studentskaSluzba;

	@Column(nullable = false)
    private Boolean vidljiv = true;
}
