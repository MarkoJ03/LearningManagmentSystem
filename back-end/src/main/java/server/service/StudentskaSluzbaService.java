package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.BibliotekaDTO;
import server.DTOs.InventarDTO;
import server.DTOs.KalendarDTO;
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
    
    

    @Override
    protected CrudRepository<StudentskaSluzba, Long> getRepository() {
        return studentskaSluzbaRepository;
    }

    @Override
    protected StudentskaSluzbaDTO convertToDTO(StudentskaSluzba entity) {
    	
    	
		ArrayList<ObjavaDTO> objave = new ArrayList<>();
		for (Objava o : entity.getObjave()) {
			ObjavaDTO oDTO = oService.convertToDTO(o);
			objave.add(oDTO);
		}
    	
		ArrayList<InventarDTO> inventari = new ArrayList<>();
		for (Inventar i : entity.getInventari()) {
		    InventarDTO iDTO = iService.convertToDTO(i);
		    inventari.add(iDTO);
		}

		ArrayList<BibliotekaDTO> biblioteke = new ArrayList<>();
		for (Biblioteka b : entity.getBiblioteke()) {
		    BibliotekaDTO bDTO = bService.convertToDTO(b);
		    biblioteke.add(bDTO);
		}

		ArrayList<NastavnikDTO> nastavnici = new ArrayList<>();
		for (Nastavnik n : entity.getNastavnici()) {
		    NastavnikDTO nDTO = nService.convertToDTO(n);
		    nastavnici.add(nDTO);
		}

		ArrayList<KalendarDTO> kalendari = new ArrayList<>();
		for (Kalendar k : entity.getKalendari()) {
		    KalendarDTO kDTO = kalendarService.convertToDTO(k);
		    kalendari.add(kDTO);
		}

		ArrayList<StudentDTO> studenti = new ArrayList<>();
		for (Student s : entity.getStudenti()) {
		    StudentDTO sDTO = studentService.convertToDTO(s);
		    studenti.add(sDTO);
		}

		ArrayList<SvObrazacDTO> obrasci = new ArrayList<>();
		for (SvObrazac o : entity.getObrasci()) {
		    SvObrazacDTO oDTO = obrazacService.convertToDTO(o);
		    obrasci.add(oDTO);
		}

		ArrayList<OsobljeDTO> osoblje = new ArrayList<>();
		for (Osoblje o : entity.getOsoblje()) {
		    OsobljeDTO oDTO = osobljeService.convertToDTO(o);
		    osoblje.add(oDTO);
		}
    	
        return new StudentskaSluzbaDTO(
            entity.getId(),
            objave,  
            inventari,  
            biblioteke,  
            osoblje,  
            nastavnici,  
            kalendari,  
            studenti,
            obrasci,
            entity.getVidljiv()
        );
    }

    @Override
    protected StudentskaSluzba convertToEntity(StudentskaSluzbaDTO dto) {
    	
		ArrayList<Osoblje> osoblje = new ArrayList<>();
		for (OsobljeDTO oDTO : dto.getOsoblje()) {
		    Osoblje o = osobljeService.convertToEntity(oDTO);
		    osoblje.add(o);
		}
    	
		ArrayList<Objava> objave = new ArrayList<>();
		for (ObjavaDTO oDTO : dto.getObjave()) {
		    Objava o = oService.convertToEntity(oDTO);
		    objave.add(o);
		}

		ArrayList<Student> studenti = new ArrayList<>();
		for (StudentDTO sDTO : dto.getStudenti()) {
		    Student s = studentService.convertToEntity(sDTO);
		    studenti.add(s);
		}

		ArrayList<SvObrazac> obrasci = new ArrayList<>();
		for (SvObrazacDTO oDTO : dto.getObrasci()) {
			SvObrazac o = obrazacService.convertToEntity(oDTO);
		    obrasci.add(o);
		}

		ArrayList<Kalendar> kalendari = new ArrayList<>();
		for (KalendarDTO kDTO : dto.getKalendari()) {
		    Kalendar k = kalendarService.convertToEntity(kDTO);
		    kalendari.add(k);
		}

		ArrayList<Nastavnik> nastavnici = new ArrayList<>();
		for (NastavnikDTO nDTO : dto.getNastavnici()) {
		    Nastavnik n = nService.convertToEntity(nDTO);
		    nastavnici.add(n);
		}

		ArrayList<Biblioteka> biblioteke = new ArrayList<>();
		for (BibliotekaDTO bDTO : dto.getBiblioteke()) {
		    Biblioteka b = bService.convertToEntity(bDTO);
		    biblioteke.add(b);
		}

		ArrayList<Inventar> inventari = new ArrayList<>();
		for (InventarDTO iDTO : dto.getInventari()) {
		    Inventar i = iService.convertToEntity(iDTO);
		    inventari.add(i);
		}
        return new StudentskaSluzba(
            dto.getId(),
            objave,  
            inventari,  
            biblioteke,  
            osoblje,  
            nastavnici,  
            kalendari,  
            studenti,
            obrasci,
            dto.getVidljiv()
        );
    }
}

