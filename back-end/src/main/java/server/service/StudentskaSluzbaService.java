package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.BibliotekaDTO;
import server.DTOs.InventarDTO;
import server.DTOs.KalendarDTO;
import server.DTOs.KorisnikDTO;
import server.DTOs.NastavnikDTO;
import server.DTOs.ObjavaDTO;
import server.DTOs.OsobljeDTO;
import server.DTOs.StudentDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.DTOs.StudentskaSluzbaDTO;
import server.DTOs.SvObrazacDTO;
import server.model.Biblioteka;
import server.model.Inventar;
import server.model.Kalendar;
import server.model.Nastavnik;
import server.model.Objava;
import server.model.Osoblje;
import server.model.Student;
import server.model.StudentNaGodini;
import server.model.StudentskaSluzba;
import server.model.SvObrazac;
import server.repository.StudentskaSluzbaRepository;
import server.repository.BibliotekaRepository;
import server.repository.InventarRepository;
import server.repository.KalendarRepository;
import server.repository.NastavnikRepository;
import server.repository.ObjavaRepository;

import server.repository.StudentRepository;
import server.repository.SvObrazacRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentskaSluzbaService extends BaseService<StudentskaSluzba, StudentskaSluzbaDTO, Long> {

    @Autowired
    private StudentskaSluzbaRepository studentskaSluzbaRepository;
    
    @Autowired
    @Lazy
    private InventarService iService;
    
    @Autowired
    @Lazy
    private ObjavaService oService;
    
    @Autowired
    @Lazy
    private NastavnikService nService;
    
    @Autowired
    @Lazy
    private BibliotekaService bService;
    
    @Autowired
    @Lazy
    private KalendarService kalendarService;
    
    @Autowired
    @Lazy
    private StudentService studentService;
    
    @Autowired
    @Lazy
    private SvObrazacService obrazacService;
    
    @Autowired
    @Lazy
    private OsobljeService osobljeService;
    
    

    
    @Autowired
    private ObjavaRepository objavaRepository;
    @Autowired
    private InventarRepository inventarRepository;
    @Autowired
    private BibliotekaRepository bibliotekaRepository; 
    @Autowired
    private NastavnikRepository nastavnikRepository;
    @Autowired
    private KalendarRepository kalendarRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private SvObrazacRepository svObrazacRepository;

   


    @Override
    protected CrudRepository<StudentskaSluzba, Long> getRepository() {
        return studentskaSluzbaRepository;
    }

    @Override
    protected StudentskaSluzbaDTO convertToDTO(StudentskaSluzba entity) {
       
        List<ObjavaDTO> objaveDTO = new ArrayList<>();
        if (entity.getObjave() != null) {
            for (Objava objava : entity.getObjave()) {
               
                ObjavaDTO oDTO = new ObjavaDTO(
                    objava.getId(),
                    objava.getNaslov(),
                    objava.getSadrzaj(),
                    
                    null, 
                    objava.getVidljiv()
                );
                objaveDTO.add(oDTO);
            }
        }

        
        List<InventarDTO> inventariDTO = new ArrayList<>();
        if (entity.getInventari() != null) {
            for (Inventar inventar : entity.getInventari()) {
                InventarDTO iDTO = new InventarDTO(
                    inventar.getId(),
                    
                    null,
                    inventar.getVidljiv()
                );
                inventariDTO.add(iDTO);
            }
        }

       
        BibliotekaDTO bibliotekaDTO = null;
        if (entity.getBiblioteke() != null) {
            Biblioteka biblioteka = entity.getBiblioteke();
            bibliotekaDTO = new BibliotekaDTO(
                biblioteka.getId(),
                null,
                null, 
                biblioteka.getVidljiv()
            );
        }


      

        
        List<KalendarDTO> kalendariDTO = new ArrayList<>();
        if (entity.getKalendari() != null) {
            for (Kalendar kalendar : entity.getKalendari()) {
                KalendarDTO kDTO = new KalendarDTO(
                    kalendar.getId(),
                    null,
                    null,
                    null,
                    null, 
                    kalendar.getVidljiv()
                );
                kalendariDTO.add(kDTO);
            }
        }

       
        List<StudentDTO> studentiDTO = new ArrayList<>();
        if (entity.getStudenti() != null) {
            for (Student student : entity.getStudenti()) {
                StudentDTO sDTO = new StudentDTO(
                    student.getId(),
                    new KorisnikDTO(student.getKorisnik().getId(),null,null,null,student.getKorisnik().getVidljiv()),
                    student.getIme(),
                    student.getPrezime(),
                    student.getJmbg(),
                    null,
                    null,
                    null,
                    student.getVidljiv()
                );
                studentiDTO.add(sDTO);
            }
        }

        
        List<SvObrazacDTO> obrasciDTO = new ArrayList<>();
        if (entity.getObrasci() != null) {
            for (SvObrazac obrazac : entity.getObrasci()) {
                SvObrazacDTO obDTO = new SvObrazacDTO(
                    obrazac.getId(),
                    obrazac.getMaternjiJezik(),
                    obrazac.getVrstaZavreseneSrednje(),
                    obrazac.getDatumZavrsetkaSrednje(),
                    obrazac.getBracniStatus(),
                    obrazac.getKontakt(),
                    obrazac.getZaposlen(),
                    obrazac.getNacinFinansiranja(),
                    null, 
                    null, 
                    obrazac.getVidljiv()
                );
                obrasciDTO.add(obDTO);
            }
        }

        
        return new StudentskaSluzbaDTO(
            entity.getId(),
            objaveDTO,
            inventariDTO,
            bibliotekaDTO, 
      
            kalendariDTO,
            studentiDTO,
            obrasciDTO,

            entity.getVidljiv()
        );
    }
 
    @Override
    protected StudentskaSluzba convertToEntity(StudentskaSluzbaDTO dto) {
        System.out.println(dto);
        StudentskaSluzba studentskaSluzba = new StudentskaSluzba();
        studentskaSluzba.setId(dto.getId()); 

        
        studentskaSluzba.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true);

        
        if (dto.getBiblioteke() != null && dto.getBiblioteke().getId() != null) {
            Biblioteka existingBiblioteka = bibliotekaRepository.findById(dto.getBiblioteke().getId())
                .orElseThrow(() -> new RuntimeException("Biblioteka with ID " + dto.getBiblioteke().getId() + " not found."));
            existingBiblioteka.setStudentskaSluzba(studentskaSluzba); 
            studentskaSluzba.setBiblioteke(existingBiblioteka);
        } else {
            studentskaSluzba.setBiblioteke(null);
        }


        
        List<Objava> objave = new ArrayList<>();
        if (dto.getObjave() != null) {
            for (ObjavaDTO objavaDTO : dto.getObjave()) {
                if (objavaDTO.getId() != null) {
                    Objava existingObjava = objavaRepository.findById(objavaDTO.getId())
                        .orElseThrow(() -> new RuntimeException("Objava not found with id " + objavaDTO.getId()));
                    existingObjava.setStudentskaSluzba(studentskaSluzba); 
                    objave.add(existingObjava);
                }
            }
        }
        studentskaSluzba.setObjave(objave);

        
        List<Inventar> inventari = new ArrayList<>();
        if (dto.getInventari() != null) {
            for (InventarDTO inventarDTO : dto.getInventari()) {
                if (inventarDTO.getId() != null) {
                    Inventar existingInventar = inventarRepository.findById(inventarDTO.getId())
                        .orElseThrow(() -> new RuntimeException("Inventar not found with id " + inventarDTO.getId()));
                    existingInventar.setStudentskaSluzba(studentskaSluzba); 
                    inventari.add(existingInventar);
                }
            }
        }
        studentskaSluzba.setInventari(inventari);


        
        List<Kalendar> kalendari = new ArrayList<>();
        if (dto.getKalendari() != null) {
            for (KalendarDTO kalendarDTO : dto.getKalendari()) {
                if (kalendarDTO.getId() != null) {
                    Kalendar existingKalendar = kalendarRepository.findById(kalendarDTO.getId())
                        .orElseThrow(() -> new RuntimeException("Kalendar not found with id " + kalendarDTO.getId()));
                    existingKalendar.setStudentskaSluzba(studentskaSluzba); 
                    kalendari.add(existingKalendar);
                }
            }
        }
        studentskaSluzba.setKalendari(kalendari);

        
        List<Student> studenti = new ArrayList<>();
        if (dto.getStudenti() != null) {
            for (StudentDTO studentDTO : dto.getStudenti()) {
                if (studentDTO.getId() != null) {
                    Student existingStudent = studentRepository.findById(studentDTO.getId())
                        .orElseThrow(() -> new RuntimeException("Student not found with id " + studentDTO.getId()));
                    existingStudent.setStudentskaSluzba(studentskaSluzba); 
                    studenti.add(existingStudent);
                }
            }
        }
        studentskaSluzba.setStudenti(studenti);

        
        List<SvObrazac> obrasci = new ArrayList<>();
        if (dto.getObrasci() != null) {
            for (SvObrazacDTO obrazacDTO : dto.getObrasci()) {
                if (obrazacDTO.getId() != null) {
                    SvObrazac existingObrazac = svObrazacRepository.findById(obrazacDTO.getId())
                        .orElseThrow(() -> new RuntimeException("SvObrazac not found with id " + obrazacDTO.getId()));
                    existingObrazac.setStudentskaSluzba(studentskaSluzba); 
                    obrasci.add(existingObrazac);
                }
            }
        }
        studentskaSluzba.setObrasci(obrasci);

        
        return studentskaSluzba;
    }
    
    @Override
    protected void updateEntityFromDto(StudentskaSluzbaDTO dto, StudentskaSluzba entity) {
        
        entity.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true);

        
        if (dto.getBiblioteke() != null && dto.getBiblioteke().getId() != null) {
            bibliotekaRepository.findById(dto.getBiblioteke().getId())
                    .ifPresent(foundBiblioteka -> {
                        foundBiblioteka.setStudentskaSluzba(entity); 
                        entity.setBiblioteke(foundBiblioteka);
                    });
        } else {
            
            if (entity.getBiblioteke() != null) {
                entity.getBiblioteke().setStudentskaSluzba(null); 
            }
            entity.setBiblioteke(null);
        }

        

        
        if (dto.getObjave() != null) {
            List<Objava> updatedObjave = dto.getObjave().stream()
                .map(objavaDTO -> objavaRepository.findById(objavaDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Objava with ID " + objavaDTO.getId() + " not found.")))
                .collect(Collectors.toList());
            entity.getObjave().clear(); 
            for (Objava objava : updatedObjave) {
                objava.setStudentskaSluzba(entity); 
                entity.getObjave().add(objava);
            }
        } else {
             entity.getObjave().clear(); 
        }


        
        if (dto.getInventari() != null) {
            List<Inventar> updatedInventari = dto.getInventari().stream()
                .map(inventarDTO -> inventarRepository.findById(inventarDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Inventar with ID " + inventarDTO.getId() + " not found.")))
                .collect(Collectors.toList());
            entity.getInventari().clear();
            for (Inventar inventar : updatedInventari) {
                inventar.setStudentskaSluzba(entity);
                entity.getInventari().add(inventar);
            }
        } else {
            entity.getInventari().clear();
        }

        
        if (dto.getKalendari() != null) {
            List<Kalendar> updatedKalendari = dto.getKalendari().stream()
                .map(kalendarDTO -> kalendarRepository.findById(kalendarDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Kalendar with ID " + kalendarDTO.getId() + " not found.")))
                .collect(Collectors.toList());
            entity.getKalendari().clear();
            for (Kalendar kalendar : updatedKalendari) {
                kalendar.setStudentskaSluzba(entity);
                entity.getKalendari().add(kalendar);
            }
        } else {
            entity.getKalendari().clear();
        }


        
        if (dto.getStudenti() != null) {
            List<Student> updatedStudenti = dto.getStudenti().stream()
                .map(studentDTO -> studentRepository.findById(studentDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Student with ID " + studentDTO.getId() + " not found.")))
                .collect(Collectors.toList());
            entity.getStudenti().clear();
            for (Student student : updatedStudenti) {
                student.setStudentskaSluzba(entity);
                entity.getStudenti().add(student);
            }
        } else {
            entity.getStudenti().clear();
        }

        
        if (dto.getObrasci() != null) {
            List<SvObrazac> updatedObrasci = dto.getObrasci().stream()
                .map(obrazacDTO -> svObrazacRepository.findById(obrazacDTO.getId())
                    .orElseThrow(() -> new RuntimeException("SvObrazac with ID " + obrazacDTO.getId() + " not found.")))
                .collect(Collectors.toList());
            entity.getObrasci().clear();
            for (SvObrazac obrazac : updatedObrasci) {
                obrazac.setStudentskaSluzba(entity);
                entity.getObrasci().add(obrazac);
            }
        } else {
            entity.getObrasci().clear();
        }
    }
}