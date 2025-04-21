package server.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public class Nastavnik {
	@Id
    private Long id; 

    @OneToOne
    @MapsId
    @JoinColumn(name = "id") 
    private Korisnik korisnik;
	@Column(nullable=false)
	private String ime;
	
	@Column(nullable = false)
	private String prezime;
	
	@Column(nullable=false, length = 13, unique = true)
	private String jmbg;
	@OneToMany (fetch= FetchType.LAZY, mappedBy = "nastavnik")
	private List<Zvanje> zvanja;
	
	@OneToMany(mappedBy = "nastavnik")
	private List<DepartmanNastavnik> departmani;
	
	@OneToMany(mappedBy = "nastavnik")
	private List<KatedraNastavnik> katedre;

}
