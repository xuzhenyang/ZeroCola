package co.lilpilot.blog.repository;

import co.lilpilot.blog.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by lilpilot on 2017/5/2.
 */
public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String name);

    Page<Tag> findAll(Pageable pageable);
}
