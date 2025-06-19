package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.StudentDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.DTOs.StudentskaSluzbaDTO;
import server.DTOs.SvObrazacDTO;
import server.controller.StudentController;
import server.model.StudentNaGodini;
import server.model.StudentskaSluzba;
import server.model.SvObrazac;
import server.repository.StudentNaGodiniRepository;
import server.repository.SvObrazacRepository;

@Service
public class SvObrazacService extends BaseService<SvObrazac, SvObrazacDTO, Long> {

    private final StudentController studentController;

    @Autowired
    private SvObrazacRepository svObrazacRepository;

    @Autowired
    private StudentNaGodiniRepository studentNaGodiniRepository;
    
    @Autowired
    @Lazy
    private AdresaService aService;
    
    SvObrazacService(StudentController studentController) {
        this.studentController = studentController;
    }

    @Override
    protected CrudRepository<SvObrazac, Long> getRepository() {
        return svObrazacRepository;
    }

    @Override
    protected SvObrazacDTO convertToDTO(SvObrazac entity) {
        

    	StudentNaGodiniDTO studentNaGodini = null;
        if (entity.getStudentNaGodini() != null) {
            studentNaGodini =  new StudentNaGodiniDTO(entity.getStudentNaGodini().getId(),entity.getStudentNaGodini().getBrojIndeksa(),null,
            		new StudentDTO(entity.getStudentNaGodini().getStudent().getId(),null,entity.getStudentNaGodini().getStudent().getIme(),entity.getStudentNaGodini().getStudent().getPrezime(),entity.getStudentNaGodini().getStudent().getJmbg(),
            		aService.convertToDTO(entity.getStudentNaGodini().getStudent().getAdresa()),null,null,entity.getStudentNaGodini().getStudent().getVidljiv()),
            		null,null,null,null,entity.getStudentNaGodini().getVidljiv());
        }
    	
    	
        StudentskaSluzbaDTO studentskaSluzbaDTO = null;
        if (entity.getStudentskaSluzba() != null) {
            studentskaSluzbaDTO = new StudentskaSluzbaDTO(
                entity.getStudentskaSluzba().getId(),
                null, 
                null, 
                null, 
                null, 
                null, 
                null, 
                entity.getStudentskaSluzba().getVidljiv()
            );
        }
        
        return new SvObrazacDTO(
        		
        	
            entity.getId(),
            entity.getMaternjiJezik(),
            entity.getVrstaZavreseneSrednje(),
            entity.getDatumZavrsetkaSrednje(),
            entity.getBracniStatus(),
            entity.getKontakt(),
            entity.getZaposlen(),
            entity.getNacinFinansiranja(),
            studentNaGodini, 
            studentskaSluzbaDTO,
            entity.getVidljiv()
        );
    }

    @Override
    protected SvObrazac convertToEntity(SvObrazacDTO dto) {
        SvObrazac svObrazac = new SvObrazac();
        
        svObrazac.setId(dto.getId());
        svObrazac.setMaternjiJezik(dto.getMaternjiJezik());
        svObrazac.setVrstaZavreseneSrednje(dto.getVrstaZavreseneSrednje());
        svObrazac.setDatumZavrsetkaSrednje(dto.getDatumZavrsetkaSrednje());
        svObrazac.setBracniStatus(dto.getBracniStatus());
        svObrazac.setKontakt(dto.getKontakt());
        svObrazac.setZaposlen(dto.getZaposlen()); 
        svObrazac.setNacinFinansiranja(dto.getNacinFinansiranja());
        

        if (dto.getStudentNaGodini() != null && dto.getStudentNaGodini().getId() != null) {
            StudentNaGodini existingDokumenti = studentNaGodiniRepository.findById(dto.getStudentNaGodini().getId())
                .orElseThrow(() -> new RuntimeException("Dokumenti with ID " + dto.getStudentNaGodini().getId() + " not found."));
            svObrazac.setStudentNaGodini(existingDokumenti);
        } else {
            svObrazac.setStudentNaGodini(null);
        }

        if (dto.getStudentskaSluzba() != null && dto.getStudentskaSluzba().getId() != null) {
            StudentskaSluzba studentskaSluzba = new StudentskaSluzba();
            studentskaSluzba.setId(dto.getStudentskaSluzba().getId());
           
            svObrazac.setStudentskaSluzba(studentskaSluzba);
        } else {
            svObrazac.setStudentskaSluzba(null); 
        }
        
        svObrazac.setVidljiv(dto.getVidljiv());
        
        return svObrazac;
    }


	@Override
	protected void updateEntityFromDto(SvObrazacDTO dto, SvObrazac entity) {
		// TODO Auto-generated method stub
		
	
}
}