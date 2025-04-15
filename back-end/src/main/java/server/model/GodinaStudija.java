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
public class GodinaStudija {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String godina;
	
    @OneToMany (fetch= FetchType.LAZY, mappedBy = "godinaStudija")
	private List<StudentNaGodini> studentiNaGodini;
    
    @ManyToOne(optional = false)
    private StudijskiProgram studijskiProgram;
    
    @Column(nullable = false)
    private Boolean vidljiv = true;
}
