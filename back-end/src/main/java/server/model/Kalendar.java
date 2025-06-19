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
public class Kalendar {


		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	
	
		@ManyToOne(optional = true)
		private StudentskaSluzba studentskaSluzba;
	
		@OneToMany (fetch= FetchType.LAZY, mappedBy = "kalendar", cascade = CascadeType.ALL, orphanRemoval = true)
		private List<EvaluacijaZnanja> evaluacijaZnanja;
	
		@OneToMany (fetch= FetchType.LAZY, mappedBy = "kalendar", cascade = CascadeType.ALL, orphanRemoval = true)
		private List<GrupaStudenata> grupaStudenata;
	
	
	
		@OneToMany(mappedBy = "kalendar", cascade = CascadeType.ALL, orphanRemoval = true)
		private List<TerminNastave> terminiNastave;
	
	    @Column(nullable = false)
	    private Boolean vidljiv = true;
	}
