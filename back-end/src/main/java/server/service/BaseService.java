package server.service;

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
                .stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<DTO> findById(ID id) {
        return getRepository().findById(id).map(this::convertToDTO);
    }

    public DTO save(DTO dto) {
        T entity = convertToEntity(dto);
        return convertToDTO(getRepository().save(entity));
    }

    public void deleteById(ID id) {
        getRepository().deleteById(id);
    }
}
