package co.lilpilot.blog.repository;

import co.lilpilot.blog.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by lilpilot on 2017/5/2.
 */
public interface PostRepository extends JpaRepository<Post, Long> {
    Post findByTitle(String title);
}
