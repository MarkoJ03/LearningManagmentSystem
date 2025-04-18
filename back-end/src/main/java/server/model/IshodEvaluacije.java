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
@AllArgsConstructor
public class IshodEvaluacije {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String napomena;

	@Column(nullable = false)
	private Integer bodovi;

	@ManyToOne(optional = false)
	private Student student;



	@ManyToOne(optional = false)
	private EvaluacijaZnanja evaluacijaZnanja;

	@Column(nullable = false)
    private Boolean vidljiv = true;
}
