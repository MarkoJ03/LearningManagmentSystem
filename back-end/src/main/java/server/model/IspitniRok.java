package server.model;



import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IspitniRok {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String naziv;

    @Column(nullable = false)
    private LocalDate datumPocetka;

    @Column(nullable = false)
    private LocalDate datumZavrsetka;
    
    private Boolean vidljiv;
}

