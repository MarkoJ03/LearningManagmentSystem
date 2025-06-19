package server.model;

import java.util.Set;

import org.hibernate.annotations.BatchSize;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString(exclude = {"dodeljenaPravaPristupa", "lozinka"}) 
@EqualsAndHashCode(onlyExplicitlyIncluded = true) 
public class Korisnik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(nullable = false, unique = true, name="email")
    private String email;

    @Column(nullable = false)
    private String lozinka;

    @OneToMany(mappedBy = "korisnik", cascade = {CascadeType.ALL}, orphanRemoval = true, fetch = FetchType.EAGER)
    @BatchSize(size = 25)
    private Set<DodeljenoPravoPristupa> dodeljenaPravaPristupa;

    @Column(nullable = false)
    private Boolean vidljiv = true;
    
    
}
