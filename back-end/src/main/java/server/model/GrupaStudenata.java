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
public class GrupaStudenata {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @OneToMany(fetch = FetchType.EAGER, mappedBy = "grupaStudenata",  cascade = CascadeType.ALL, orphanRemoval = true)
	    private List<StudentNaGodini> studentNaGodini;

	    @OneToMany(fetch = FetchType.EAGER, mappedBy = "grupaStudenata", cascade = CascadeType.ALL, orphanRemoval = true)
	    private List<GrupaStudenataPredmet> predmeti;

	    @ManyToOne(optional = true)
	    private Kalendar kalendar;

	    @Column(nullable = true)
	    private Boolean vidljiv = true;
}
