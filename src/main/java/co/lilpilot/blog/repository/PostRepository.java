package co.lilpilot.blog.repository;

import co.lilpilot.blog.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by lilpilot on 2017/5/2.
 */
public interface PostRepository extends JpaRepository<Post, Long> {
    Post findByTitle(String title);

    @Query("from Post post where post.status = '1' and post.id = ?1")
    Post findOpenPostById(Long id);

    Page<Post> findAll(Pageable pageable);

    @Query("from Post post where post.status = '1' order by post.createTime desc")
    Page<Post> findAllOpenPosts(Pageable pageable);

    @Query("from Post post where post.status = '1' and post.title like ?1% order by post.createTime desc")
    Page<Post> findOpenPostsByKeyword(String keyword, Pageable pageable);
}
