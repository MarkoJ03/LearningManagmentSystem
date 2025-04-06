package server.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Departman {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String naziv;
	
	@ManyToOne(optional = false)
	private Fakultet fakultet;
	
	@ManyToOne
    @JoinColumn(name = "sekretarDepartmana_id", nullable = false)
	private Nastavnik sekretarDepartmana;
	
	@ManyToOne
    @JoinColumn(name = "direktorDepartmana_id", nullable = false)
	private Nastavnik direktorDepartmana;
	
	@OneToMany(mappedBy = "departman")
	private List<DepartmanNastavnik> nastavnici;
}
