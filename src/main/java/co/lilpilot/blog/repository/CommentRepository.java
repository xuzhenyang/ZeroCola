package co.lilpilot.blog.repository;

import co.lilpilot.blog.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by lilpilot on 2017/5/26.
 */
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
