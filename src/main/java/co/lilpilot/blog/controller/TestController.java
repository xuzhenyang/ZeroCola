package co.lilpilot.blog.controller;

import co.lilpilot.blog.model.User;
import co.lilpilot.blog.security.JwtTokenUtil;
import co.lilpilot.blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.Device;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lilpilot on 2017/5/2.
 */
@RestController
@RequestMapping("/api/v1")
public class TestController {

    @Autowired
    private UserService userService;

    @GetMapping("/hello")
    public String hello() {
        return "hello world";
    }

    @GetMapping("/init")
    public String init() {
        User user = new User();
        user.setUsername("admin");
        user.setPasswordHashed(new BCryptPasswordEncoder().encode("123456"));
        user.setRole("ADMIN");
        userService.saveOrUpdate(user);
        user = new User();
        user.setUsername("user");
        user.setPasswordHashed(new BCryptPasswordEncoder().encode("123456"));
        user.setRole("USER");
        userService.saveOrUpdate(user);
        return "init success";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/test")
    public String test() {
        return "you are admin";
    }

}
