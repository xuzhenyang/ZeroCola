package co.lilpilot.blog.security;

import co.lilpilot.blog.model.User;
import co.lilpilot.blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Created by lilpilot on 2017/5/2.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.getByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("username not found:" + username);
        }
        /*
        * 例如：
        * 在使用hasRole('ADMIN')时
        * spring security会加上ROLE_即ROLE_ADMIN去校对 所以手动加上ROLE_
        * */
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPasswordHashed(), AuthorityUtils.createAuthorityList("ROLE_" + user.getRole()));
    }
}
