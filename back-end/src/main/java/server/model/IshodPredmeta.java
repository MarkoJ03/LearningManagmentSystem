package server.model;


import java.util.List;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class IshodPredmeta {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private Integer ocena;

	
	@OneToMany(mappedBy = "ishodPredmeta")
	private List<RealizacijaPredmeta> realizacijePredmeta;
	
	@OneToMany(mappedBy = "ishodPredmeta")
	private List<IshodEvaluacije> ishodiEvaluacije;

    @Column(nullable = false)
    private Boolean vidljiv = true;
}
