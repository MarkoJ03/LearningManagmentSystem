package server.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

public class StudentNaGodini {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String brojIndeksa;
	
	@Column(nullable = false)
	private Date datumUpisa;
	
	@ManyToOne(optional = false)
	private Student student;
	
}
