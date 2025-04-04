package server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class Student {
	
	@Id
    private Long id; 

    @OneToOne
    @MapsId
    @JoinColumn(name = "id") 
    private Korisnik korisnik;

    @Column(nullable = false)
    private String ime;
    
    @Column(nullable = false)
    private String prezime;

    @Column(length = 13, unique = true)
    private String jmbg;

    @ManyToOne
    @JoinColumn(name = "adresa_id", nullable = false)
    private Adresa adresa;
}
