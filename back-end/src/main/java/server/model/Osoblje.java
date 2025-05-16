package server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Osoblje {

	@Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Korisnik korisnik;

	@Column(nullable = false, unique = true)
	private String ime;

	@Column(nullable = false, unique = true)
	private String prezime;

	@Column(nullable = false, unique = true)
	private String jmbg;

	@ManyToOne(optional = false)
	private StudentskaSluzba studentskaSluzba;

	@Column(nullable = false)
    private Boolean vidljiv = true;
}
