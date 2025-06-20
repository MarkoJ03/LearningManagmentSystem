package server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor

public class Inventar {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	private StudentskaSluzba studentskaSluzba;

	@Column(nullable = false)
    private Boolean vidljiv = true;

	public Inventar(Long id, StudentskaSluzba studentskaSluzba, Boolean vidljiv) {
        this.id = id;
        this.studentskaSluzba = studentskaSluzba;
        this.vidljiv = vidljiv;
    }
}
