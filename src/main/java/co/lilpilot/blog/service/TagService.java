package co.lilpilot.blog.service;

import co.lilpilot.blog.model.Tag;
import co.lilpilot.blog.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by lilpilot on 2017/5/3.
 */
@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    public Tag saveOrUpdate(Tag tag) {
        if (tag == null) {
            throw new IllegalArgumentException("tag is null");
        }
        return tagRepository.save(tag);
    }
}
