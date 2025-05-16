package server.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.repository.CrudRepository;

public abstract class BaseService<T, DTO, ID> {

    protected abstract CrudRepository<T, ID> getRepository();
    protected abstract DTO convertToDTO(T entity);
    protected abstract T convertToEntity(DTO dto);

    public List<DTO> findAll() {
        return ((List<T>) getRepository().findAll())
                .stream()
                .filter(this::isVidljiv)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<DTO> findAllIncludeDeleted() {
        return ((List<T>) getRepository().findAll())
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<DTO> findById(ID id) {
        return getRepository().findById(id)
                .filter(this::isVidljiv)
                .map(this::convertToDTO);
    }

    public DTO save(DTO dto) {
        T entity = convertToEntity(dto);
        setVidljiv(entity, true);
        return convertToDTO(getRepository().save(entity));
    }

    public void deleteById(ID id) {
        Optional<T> optional = getRepository().findById(id);
        optional.ifPresent(entity -> {
            setVidljiv(entity, false);
            getRepository().save(entity);
        });
    }

   // proverava da li je vidljiv == true
    private boolean isVidljiv(T entity) {
        try {
            Field field = entity.getClass().getDeclaredField("vidljiv");
            field.setAccessible(true);
            Boolean vidljiv = (Boolean) field.get(entity);
            return vidljiv == null || vidljiv; // ako null, tretiramo kao true
        } catch (Exception e) {
            throw new RuntimeException("Polje 'vidljiv' nije definisano u entitetu: " + entity.getClass().getSimpleName());
        }
    }

 // postavlja vidljivost
    private void setVidljiv(T entity, boolean value) {
        try {
            Field field = entity.getClass().getDeclaredField("vidljiv");
            field.setAccessible(true);
            field.set(entity, value);
        } catch (Exception e) {
            throw new RuntimeException("Nije moguce postaviti 'vidljiv' u entitetu: " + entity.getClass().getSimpleName());
        }
    }
}