package server.model;

import java.util.List;

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
	
	@OneToMany (fetch= FetchType.LAZY, mappedBy = "tipZvanja")
	private List<StudentNaGodini> studentNaGodini;
	
	@OneToMany (fetch= FetchType.LAZY, mappedBy = "tipZvanja")
	private List<GrupaStudenataPredmet> grupaStudenataPredmet;
	
	@ManyToOne(optional = false)
	private Kalendar kalendar;
	
	@Column(nullable = false)
    private Boolean vidljiv = true;
}
