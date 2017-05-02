package co.lilpilot.blog.service;

import co.lilpilot.blog.model.User;
import co.lilpilot.blog.repository.UserRepository;
import com.google.common.base.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by lilpilot on 2017/5/2.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveOrUpdate(User user) {
        if (user == null) {
            throw new IllegalArgumentException("user is null");
        }
        return userRepository.save(user);
    }

    public User getByUsername(String username) {
        if (Strings.isNullOrEmpty(username)) {
            throw new IllegalArgumentException("username is empty");
        }
        return userRepository.findByUsername(username);
    }
}
