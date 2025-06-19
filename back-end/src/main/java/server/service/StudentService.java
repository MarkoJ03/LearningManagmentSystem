package server.service;

import java.util.HashSet;
import java.util.List; // Koristimo java.util.List umesto ArrayList za deklaracije
import java.util.Set;
import java.util.ArrayList; // i dalje koristimo ArrayList za inicijalizaciju
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.AdresaDTO;
import server.DTOs.DodeljenoPravoPristupaDTO;
import server.DTOs.KorisnikDTO;
import server.DTOs.StudentDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.DTOs.StudentskaSluzbaDTO; // Dodato
import server.model.Adresa;
import server.model.DodeljenoPravoPristupa;
import server.model.Korisnik;
import server.model.Student;
import server.model.StudentNaGodini;
import server.model.StudentskaSluzba; // Dodato
import server.repository.StudentRepository;
import server.repository.AdresaRepository;
import server.repository.KorisnikRepository;
import server.repository.GradRepository; // Pretpostavljam da ti treba i ovaj repozitorijum
import server.repository.StudentskaSluzbaRepository; // Dodato

@Service
public class StudentService extends BaseService<Student, StudentDTO, Long> {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    @Lazy
    private DodeljenoPravoPristupaService dodeljenoPravoPrisupaService;

    @Autowired
    @Lazy
    private GradService gService;

    @Autowired
    @Lazy
    private StudentNaGodiniService studentNaGodiniService;

    @Autowired
    private AdresaRepository adresaRepository;
    @Autowired
    private KorisnikRepository korisnikRepository;
    @Autowired
    private StudentskaSluzbaRepository studentskaSluzbaRepository; 
    
    @Autowired
    @Lazy
    private StudentskaSluzbaService studentskaSluzbaService; 

    @Override
    protected CrudRepository<Student, Long> getRepository() {
        return studentRepository;
    }

    @Override
    protected StudentDTO convertToDTO(Student entity) {

        Set<DodeljenoPravoPristupaDTO> dodeljenaPravaPristupa = new HashSet<>();
        if (entity.getKorisnik() != null && entity.getKorisnik().getDodeljenaPravaPristupa() != null) {
            for (DodeljenoPravoPristupa dpp : entity.getKorisnik().getDodeljenaPravaPristupa()) {
                DodeljenoPravoPristupaDTO dppDTO = dodeljenoPravoPrisupaService.convertToDTO(dpp);
                dodeljenaPravaPristupa.add(dppDTO);
            }
        }

        ArrayList<StudentNaGodiniDTO> studentiNaGodiniDTOList = new ArrayList<>();
        if (entity.getStudentiNaGodini() != null) {
            for (StudentNaGodini s : entity.getStudentiNaGodini()) {
                
                StudentNaGodiniDTO sDTO = new StudentNaGodiniDTO(s.getId(), s.getBrojIndeksa(), null, null, null, null, null, null, null);
                studentiNaGodiniDTOList.add(sDTO);
            }
        }

        KorisnikDTO korisnikDTO = null;
        if (entity.getKorisnik() != null) {
            korisnikDTO = new KorisnikDTO(entity.getKorisnik().getId(), entity.getKorisnik().getEmail(),
                    entity.getKorisnik().getLozinka(), dodeljenaPravaPristupa, entity.getKorisnik().getVidljiv());
        }

        AdresaDTO adresaDTO = null;
        if (entity.getAdresa() != null && entity.getAdresa().getGrad() != null) {
            adresaDTO = new AdresaDTO(entity.getAdresa().getId(), gService.convertToDTO(entity.getAdresa().getGrad()),
                    entity.getAdresa().getUlica(), entity.getAdresa().getBroj(), entity.getAdresa().getVidljiv());
        }

        StudentskaSluzbaDTO studentskaSluzbaDTO = null;
        if (entity.getStudentskaSluzba() != null) {
            
            studentskaSluzbaDTO = studentskaSluzbaService.convertToDTO(entity.getStudentskaSluzba());
            
        }


        return new StudentDTO(entity.getId(), korisnikDTO, entity.getIme(), entity.getPrezime(), entity.getJmbg(),
                adresaDTO, studentskaSluzbaDTO, studentiNaGodiniDTOList, entity.getVidljiv());
    }

    @Override
    protected Student convertToEntity(StudentDTO dto) {
      
        Korisnik korisnikEntity = null;
        if (dto.getKorisnik() != null) {
            if (dto.getKorisnik().getId() != null) {
               
                korisnikEntity = korisnikRepository.findById(dto.getKorisnik().getId()).orElse(null);
            }
            if (korisnikEntity == null) {
                
                korisnikEntity = new Korisnik();
                if (dto.getKorisnik().getId() != null) {
                    korisnikEntity.setId(dto.getKorisnik().getId()); 
                }
            }
            
            korisnikEntity.setEmail(dto.getKorisnik().getEmail());
            korisnikEntity.setLozinka(dto.getKorisnik().getLozinka());
            korisnikEntity.setVidljiv(dto.getKorisnik().getVidljiv());

           
            Set<DodeljenoPravoPristupa> dodeljenaPravaPristupa = new HashSet<>();
            if (dto.getKorisnik().getDodeljenaPravaPristupa() != null) {
                for (DodeljenoPravoPristupaDTO dppDTO : dto.getKorisnik().getDodeljenaPravaPristupa()) {
                  
                    DodeljenoPravoPristupa dpp = dodeljenoPravoPrisupaService.convertToEntity(dppDTO);
                    dodeljenaPravaPristupa.add(dpp);
                }
            }
            korisnikEntity.setDodeljenaPravaPristupa(dodeljenaPravaPristupa);
        }

        
        Adresa adresaEntity = null;
        if (dto.getAdresa() != null) {
            if (dto.getAdresa().getId() != null) {
                adresaEntity = adresaRepository.findById(dto.getAdresa().getId()).orElse(null);
            }
            if (adresaEntity == null) {
                adresaEntity = new Adresa();
                if (dto.getAdresa().getId() != null) {
                    adresaEntity.setId(dto.getAdresa().getId());
                }
            }
            adresaEntity.setUlica(dto.getAdresa().getUlica());
            adresaEntity.setBroj(dto.getAdresa().getBroj());
            adresaEntity.setVidljiv(dto.getAdresa().getVidljiv());
            if (dto.getAdresa().getGrad() != null) {
                adresaEntity.setGrad(gService.convertToEntity(dto.getAdresa().getGrad()));
            }
        }

        
        StudentskaSluzba studentskaSluzbaEntity = null;
        if (dto.getStudentskaSluzba() != null && dto.getStudentskaSluzba().getId() != null) {
            Optional<StudentskaSluzba> optionalStudentskaSluzba = studentskaSluzbaRepository.findById(dto.getStudentskaSluzba().getId());
            if (optionalStudentskaSluzba.isPresent()) {
                studentskaSluzbaEntity = optionalStudentskaSluzba.get();
            } else {

                System.err.println("StudentskaSluzba sa ID-jem " + dto.getStudentskaSluzba().getId() + " nije pronađena prilikom konverzije Studenta.");
            }
        } else {
           
            System.err.println("StudentDTO nema StudentskaSluzba informaciju, ili ID StudentskeSluzbe je null.");
        }
		

	



       
        ArrayList<StudentNaGodini> studentiNaGodiniList = new ArrayList<>();
        if (dto.getStudentiNaGodini() != null) {
            for (StudentNaGodiniDTO sngDTO : dto.getStudentiNaGodini()) {
                if (sngDTO.getId() != null) {
                    
                    studentNaGodiniService.getRepository().findById(sngDTO.getId())
                        .ifPresent(studentiNaGodiniList::add);
                } else {
                    
                    System.err.println("StudentNaGodiniDTO sa null ID-jem prilikom konverzije Studenta. Preskočeno.");
                }
            }
        }

        
        return new Student(
            dto.getId(),
            korisnikEntity,
            dto.getIme(),
            dto.getPrezime(),
            dto.getJmbg(),
            adresaEntity,
            studentskaSluzbaEntity, 
            studentiNaGodiniList,
            dto.getVidljiv()
        );
    }

    @Override
    protected void updateEntityFromDto(StudentDTO dto, Student entity) {
        
        if (dto.getIme() != null) {
            entity.setIme(dto.getIme());
        }
        if (dto.getPrezime() != null) {
            entity.setPrezime(dto.getPrezime());
        }
        if (dto.getJmbg() != null) {
            entity.setJmbg(dto.getJmbg());
        }
        if (dto.getVidljiv() != null) {
            entity.setVidljiv(dto.getVidljiv());
        }

        
        if (dto.getKorisnik() != null) {
            if (entity.getKorisnik() == null) {
               
                Korisnik newKorisnik = null;
                if (dto.getKorisnik().getId() != null) {
                    newKorisnik = korisnikRepository.findById(dto.getKorisnik().getId()).orElse(new Korisnik());
                } else {
                    newKorisnik = new Korisnik(); 
                }
                entity.setKorisnik(newKorisnik);
            }
            
            if (dto.getKorisnik().getEmail() != null) {
                entity.getKorisnik().setEmail(dto.getKorisnik().getEmail());
            }
            if (dto.getKorisnik().getLozinka() != null) {
                entity.getKorisnik().setLozinka(dto.getKorisnik().getLozinka());
            }
            if (dto.getKorisnik().getVidljiv() != null) {
                entity.getKorisnik().setVidljiv(dto.getKorisnik().getVidljiv());
            }

            
            Set<DodeljenoPravoPristupa> updatedDpp = new HashSet<>();
            if (dto.getKorisnik().getDodeljenaPravaPristupa() != null) {
                for (DodeljenoPravoPristupaDTO dppDTO : dto.getKorisnik().getDodeljenaPravaPristupa()) {
                    if (dppDTO.getId() != null) {
                        dodeljenoPravoPrisupaService.getRepository().findById(dppDTO.getId())
                            .ifPresent(updatedDpp::add);
                    }
                    
                }
            }
            if (entity.getKorisnik().getDodeljenaPravaPristupa() != null) {
                 entity.getKorisnik().getDodeljenaPravaPristupa().clear();
                 entity.getKorisnik().getDodeljenaPravaPristupa().addAll(updatedDpp);
            } else {
                 
                 entity.getKorisnik().setDodeljenaPravaPristupa(updatedDpp);
            }
        } else {
            
            entity.setKorisnik(null);
        }

        
        if (dto.getAdresa() != null) {
            if (entity.getAdresa() == null) {
                Adresa newAdresa = null;
                if (dto.getAdresa().getId() != null) {
                    newAdresa = adresaRepository.findById(dto.getAdresa().getId()).orElse(new Adresa());
                } else {
                    newAdresa = new Adresa(); 
                }
                entity.setAdresa(newAdresa);
            }
            
            if (dto.getAdresa().getUlica() != null) {
                entity.getAdresa().setUlica(dto.getAdresa().getUlica());
            }
            if (dto.getAdresa().getBroj() != null) {
                entity.getAdresa().setBroj(dto.getAdresa().getBroj());
            }
            if (dto.getAdresa().getVidljiv() != null) {
                entity.getAdresa().setVidljiv(dto.getAdresa().getVidljiv());
            }
            if (dto.getAdresa().getGrad() != null) {
                entity.getAdresa().setGrad(gService.convertToEntity(dto.getAdresa().getGrad()));
            }
        } else {
            entity.setAdresa(null);
        }

       
        if (dto.getStudentskaSluzba() != null && dto.getStudentskaSluzba().getId() != null) {
            studentskaSluzbaRepository.findById(dto.getStudentskaSluzba().getId())
                .ifPresent(entity::setStudentskaSluzba);
        } else {
            
            entity.setStudentskaSluzba(null);
           
        }

       
        List<StudentNaGodini> updatedStudentiNaGodini = new ArrayList<>();
        if (dto.getStudentiNaGodini() != null) {
            for (StudentNaGodiniDTO sngDTO : dto.getStudentiNaGodini()) {
                if (sngDTO.getId() != null) {
                    studentNaGodiniService.getRepository().findById(sngDTO.getId())
                        .ifPresent(updatedStudentiNaGodini::add);
                } else {
                    
                    System.err.println("StudentNaGodiniDTO sa null ID-jem prilikom update-a. Preskočeno.");
                }
            }
        }

        
        if (entity.getStudentiNaGodini() != null) {
            entity.getStudentiNaGodini().clear();
            entity.getStudentiNaGodini().addAll(updatedStudentiNaGodini);
        } else {
            entity.setStudentiNaGodini(updatedStudentiNaGodini);
        }
    }
}